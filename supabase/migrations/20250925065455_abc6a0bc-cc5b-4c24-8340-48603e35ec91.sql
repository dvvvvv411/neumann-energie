-- Create order_notes table
CREATE TABLE public.order_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL,
  note_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.order_notes ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Enable authenticated reads for order notes" 
ON public.order_notes 
FOR SELECT 
USING (true);

CREATE POLICY "Enable authenticated inserts for order notes" 
ON public.order_notes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable authenticated updates for order notes" 
ON public.order_notes 
FOR UPDATE 
USING (true);

-- Add foreign key constraint (referencing orders table)
ALTER TABLE public.order_notes 
ADD CONSTRAINT fk_order_notes_order_id 
FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;

-- Enable realtime for order_notes table
ALTER TABLE public.order_notes REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.order_notes;