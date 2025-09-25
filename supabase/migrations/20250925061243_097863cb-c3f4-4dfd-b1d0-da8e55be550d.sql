-- Create contact_request_notes table
CREATE TABLE public.contact_request_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_request_id UUID NOT NULL,
  note_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT fk_contact_request_notes_contact_request_id 
    FOREIGN KEY (contact_request_id) 
    REFERENCES public.contact_requests(id) 
    ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.contact_request_notes ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Enable authenticated reads for contact request notes" 
ON public.contact_request_notes 
FOR SELECT 
USING (true);

CREATE POLICY "Enable authenticated inserts for contact request notes" 
ON public.contact_request_notes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable authenticated updates for contact request notes" 
ON public.contact_request_notes 
FOR UPDATE 
USING (true);

-- Add index for better performance
CREATE INDEX idx_contact_request_notes_contact_request_id ON public.contact_request_notes(contact_request_id);
CREATE INDEX idx_contact_request_notes_created_at ON public.contact_request_notes(created_at DESC);

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_request_notes;