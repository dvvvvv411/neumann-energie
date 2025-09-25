-- Create email_settings table for Resend configuration
CREATE TABLE public.email_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  api_key TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users only
CREATE POLICY "Enable authenticated reads for email settings" 
ON public.email_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Enable authenticated inserts for email settings" 
ON public.email_settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable authenticated updates for email settings" 
ON public.email_settings 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_email_settings_updated_at
BEFORE UPDATE ON public.email_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();