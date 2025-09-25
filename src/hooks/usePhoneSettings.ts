import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PhoneSettings {
  id: string;
  phone_number: string;
  display_text: string;
  tel_link: string;
  is_active: boolean;
}

export function usePhoneSettings() {
  const [phoneSettings, setPhoneSettings] = useState<PhoneSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPhoneSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('phone_settings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching phone settings:', error);
        setError(error.message);
        // Fallback to default values
        setPhoneSettings({
          id: '',
          phone_number: '0228 512-710',
          display_text: '0228 512-710',
          tel_link: '0228512710',
          is_active: true
        });
      } else {
        setPhoneSettings(data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching phone settings:', err);
      setError('Failed to load phone settings');
      // Fallback to default values
      setPhoneSettings({
        id: '',
        phone_number: '0228 512-710',
        display_text: '0228 512-710',
        tel_link: '0228512710',
        is_active: true
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePhoneSettings = async (phoneNumber: string) => {
    try {
      // Format the phone number for tel: link (remove spaces and dashes)
      const telLink = phoneNumber.replace(/[\s-]/g, '');
      
      // First, set all existing entries to inactive
      await supabase
        .from('phone_settings')
        .update({ is_active: false })
        .eq('is_active', true);

      // Then insert a new active entry
      const { data, error } = await supabase
        .from('phone_settings')
        .insert({
          phone_number: phoneNumber,
          display_text: phoneNumber,
          tel_link: telLink,
          is_active: true
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setPhoneSettings(data);
      toast({
        title: "Telefonnummer aktualisiert",
        description: "Die Telefonnummer wurde erfolgreich gespeichert.",
      });

      return true;
    } catch (err) {
      console.error('Error updating phone settings:', err);
      toast({
        title: "Fehler",
        description: "Telefonnummer konnte nicht gespeichert werden.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPhoneSettings();
  }, []);

  return {
    phoneSettings,
    loading,
    error,
    updatePhoneSettings,
    refetch: fetchPhoneSettings
  };
}