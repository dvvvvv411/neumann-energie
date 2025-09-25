-- Set all but the most recent phone_settings entry to inactive
UPDATE phone_settings 
SET is_active = false 
WHERE id != (
  SELECT id FROM phone_settings 
  ORDER BY created_at DESC 
  LIMIT 1
);