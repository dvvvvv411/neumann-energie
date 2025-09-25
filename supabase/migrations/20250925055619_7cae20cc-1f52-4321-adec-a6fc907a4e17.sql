-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_requests;
DROP POLICY IF EXISTS "Authenticated users can view contact requests" ON public.contact_requests;

-- Create improved RLS policies
CREATE POLICY "Enable anonymous inserts for contact requests" 
ON public.contact_requests 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Enable authenticated reads for contact requests" 
ON public.contact_requests 
FOR SELECT 
TO authenticated
USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;