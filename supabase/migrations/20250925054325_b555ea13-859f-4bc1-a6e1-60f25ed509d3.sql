-- Create contact_requests table
CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salutation text NOT NULL,
  company text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all contact requests
CREATE POLICY "Authenticated users can view contact requests" 
ON public.contact_requests 
FOR SELECT 
TO authenticated 
USING (true);

-- Policy: Allow anonymous users to insert contact requests
CREATE POLICY "Allow anonymous inserts" 
ON public.contact_requests 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Enable realtime for live updates
ALTER TABLE public.contact_requests REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_requests;