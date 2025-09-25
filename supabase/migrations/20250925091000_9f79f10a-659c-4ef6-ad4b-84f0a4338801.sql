-- Create IMAP settings table
CREATE TABLE public.imap_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL DEFAULT 993,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  use_tls BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cached emails table
CREATE TABLE public.cached_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id TEXT NOT NULL UNIQUE,
  subject TEXT,
  sender TEXT NOT NULL,
  recipient TEXT,
  body_plain TEXT,
  body_html TEXT,
  received_date TIMESTAMP WITH TIME ZONE,
  is_read BOOLEAN NOT NULL DEFAULT false,
  folder TEXT NOT NULL DEFAULT 'INBOX',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.imap_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cached_emails ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users only
CREATE POLICY "Enable authenticated reads for imap settings" 
ON public.imap_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Enable authenticated inserts for imap settings" 
ON public.imap_settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable authenticated updates for imap settings" 
ON public.imap_settings 
FOR UPDATE 
USING (true);

CREATE POLICY "Enable authenticated reads for cached emails" 
ON public.cached_emails 
FOR SELECT 
USING (true);

CREATE POLICY "Enable authenticated inserts for cached emails" 
ON public.cached_emails 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable authenticated updates for cached emails" 
ON public.cached_emails 
FOR UPDATE 
USING (true);

-- Add trigger for automatic timestamp updates on imap_settings
CREATE TRIGGER update_imap_settings_updated_at
BEFORE UPDATE ON public.imap_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on email queries
CREATE INDEX idx_cached_emails_received_date ON public.cached_emails(received_date DESC);
CREATE INDEX idx_cached_emails_message_id ON public.cached_emails(message_id);
CREATE INDEX idx_cached_emails_folder ON public.cached_emails(folder);