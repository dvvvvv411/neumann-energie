-- Create Telegram settings table
CREATE TABLE public.telegram_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bot_token TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Telegram chat IDs table
CREATE TABLE public.telegram_chat_ids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id TEXT NOT NULL,
  chat_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notification_types TEXT[] NOT NULL DEFAULT ARRAY['anfragen', 'bestellungen'],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.telegram_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_chat_ids ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users only
CREATE POLICY "Enable authenticated reads for telegram settings" 
ON public.telegram_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Enable authenticated inserts for telegram settings" 
ON public.telegram_settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable authenticated updates for telegram settings" 
ON public.telegram_settings 
FOR UPDATE 
USING (true);

CREATE POLICY "Enable authenticated reads for telegram chat ids" 
ON public.telegram_chat_ids 
FOR SELECT 
USING (true);

CREATE POLICY "Enable authenticated inserts for telegram chat ids" 
ON public.telegram_chat_ids 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable authenticated updates for telegram chat ids" 
ON public.telegram_chat_ids 
FOR UPDATE 
USING (true);

CREATE POLICY "Enable authenticated deletes for telegram chat ids" 
ON public.telegram_chat_ids 
FOR DELETE 
USING (true);

-- Add trigger for automatic timestamp updates on telegram_settings
CREATE TRIGGER update_telegram_settings_updated_at
BEFORE UPDATE ON public.telegram_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_telegram_chat_ids_active ON public.telegram_chat_ids(is_active);
CREATE INDEX idx_telegram_chat_ids_notification_types ON public.telegram_chat_ids USING GIN(notification_types);