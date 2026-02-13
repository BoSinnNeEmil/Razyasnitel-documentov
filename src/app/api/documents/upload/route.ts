import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { parseDocument, getPageCount } from '@/lib/document-parser';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Check file size (10MB limit for free tier)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    // Check user's document limit
    const { data: profile } = await supabase
      .from('profiles')
      .select('documents_count, documents_limit')
      .eq('id', session.user.id)
      .single();

    if (profile && profile.documents_count >= profile.documents_limit) {
      return NextResponse.json({ error: 'Document limit reached' }, { status: 403 });
    }

    // Parse document to get page count
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let pageCount = null;
    try {
      const text = await parseDocument(buffer, file.type);
      pageCount = getPageCount(text);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      // Continue anyway, parsing will be attempted again during analysis
    }

    // Upload file to Supabase Storage
    const fileName = `${session.user.id}/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    // Create document record
    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: session.user.id,
        title: file.name.replace(/\.[^/.]+$/, ''),
        original_filename: file.name,
        file_path: uploadData.path,
        file_size: file.size,
        file_type: file.type,
        page_count: pageCount,
        status: 'processing',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
    }

    // Update documents count
    await supabase.rpc('increment_documents_count', { user_id: session.user.id });

    return NextResponse.json({ document });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
