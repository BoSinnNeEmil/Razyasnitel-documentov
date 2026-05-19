import { APPWRITE_CONFIG, createDocument, getOrCreateProfile, updateProfile } from '@/lib/appwrite'
import { storage } from '@/lib/appwrite'
import { authOptions } from '@/lib/auth'
import { getPageCount, parseDocument } from '@/lib/document-parser'
import { ID } from 'appwrite'
import { getServerSession } from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    const userId = session?.user?.id || 'guest'
    const isGuest = !session?.user?.id

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
    }

    if (!isGuest) {
      const email = session?.user?.email
      if (email) {
        try {
          const profile = await getOrCreateProfile(userId, email)
          if (profile && profile.documents_count >= profile.documents_limit) {
            return NextResponse.json({ error: 'Document limit reached' }, { status: 403 })
          }
        } catch {
          // Continue if profile check fails
        }
      }
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let pageCount: number | null = null
    try {
      const text = await parseDocument(buffer, file.type)
      pageCount = getPageCount(text)
    } catch (parseError) {
      console.error('Parse error:', parseError)
    }

    let uploadResult: { $id: string } | null = null
    try {
      uploadResult = await storage.createFile(APPWRITE_CONFIG.bucketId, ID.unique(), file)
    } catch (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    if (isGuest || !uploadResult) {
      return NextResponse.json({
        document: {
          id: `guest-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          original_filename: file.name,
          file_path: uploadResult?.$id || '',
          file_size: file.size,
          file_type: file.type,
          page_count: pageCount,
          status: 'processing',
          user_id: 'guest',
        },
      })
    }

    try {
      const document = await createDocument({
        user_id: userId,
        title: file.name.replace(/\.[^/.]+$/, ''),
        original_filename: file.name,
        file_path: uploadResult.$id,
        file_size: file.size,
        file_type: file.type,
        page_count: pageCount,
        status: 'processing',
      })

      const email = session?.user?.email
      if (email) {
        const profile = await getOrCreateProfile(userId, email)
        await updateProfile(userId, {
          documents_count: (profile.documents_count || 0) + 1,
        })
      }

      return NextResponse.json({ document })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
