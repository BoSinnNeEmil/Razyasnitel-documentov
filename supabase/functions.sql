-- Function to increment documents count
CREATE OR REPLACE FUNCTION increment_documents_count(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET documents_count = documents_count + 1
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement documents count
CREATE OR REPLACE FUNCTION decrement_documents_count(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET documents_count = GREATEST(documents_count - 1, 0)
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to decrement count when document is deleted
CREATE OR REPLACE FUNCTION handle_document_delete()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM decrement_documents_count(OLD.user_id);
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_document_deleted
  BEFORE DELETE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION handle_document_delete();
