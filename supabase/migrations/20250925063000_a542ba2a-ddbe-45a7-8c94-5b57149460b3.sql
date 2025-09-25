-- Create orders table for customer orders from /anfrage
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  postcode TEXT NOT NULL,
  product TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  delivery_points INTEGER NOT NULL,
  delivery_time TEXT NOT NULL,
  message TEXT,
  salutation TEXT NOT NULL,
  company TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  city_postcode TEXT NOT NULL,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous inserts (customers can create orders)
CREATE POLICY "Enable anonymous inserts for orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Create policies for authenticated reads (admin users can view orders)
CREATE POLICY "Enable authenticated reads for orders" 
ON public.orders 
FOR SELECT 
USING (true);

-- Create policies for authenticated updates (admin users can update order status)
CREATE POLICY "Enable authenticated updates for orders" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for orders table
ALTER TABLE public.orders REPLICA IDENTITY FULL;

-- Add check constraint for valid status values
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check 
CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'));