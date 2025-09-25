-- Drop the existing status check constraint
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Add new constraint with the correct status values
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check 
CHECK (status = ANY (ARRAY['pending'::text, 'processing'::text, 'wants_invoice'::text, 'invoice_sent'::text, 'paid'::text]));