-- Create phone_settings table
CREATE TABLE public.phone_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  display_text TEXT NOT NULL,
  tel_link TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.phone_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for phone_settings
CREATE POLICY "Enable authenticated reads for phone settings" 
ON public.phone_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Enable authenticated inserts for phone settings" 
ON public.phone_settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable authenticated updates for phone settings" 
ON public.phone_settings 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_phone_settings_updated_at
BEFORE UPDATE ON public.phone_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial phone number
INSERT INTO public.phone_settings (phone_number, display_text, tel_link, is_active)
VALUES ('0228 512-710', '0228 512-710', '0228512710', true);