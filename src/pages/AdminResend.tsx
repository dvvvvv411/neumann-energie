import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send, Eye, Save, RefreshCw } from "lucide-react";

interface EmailSettings {
  id?: string;
  sender_name: string;
  sender_email: string;
  api_key: string;
}

const AdminResend = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<EmailSettings>({
    sender_name: '',
    sender_email: '',
    api_key: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sample data for previews
  const sampleContactData = {
    company: 'Musterfirma GmbH',
    first_name: 'Max',
    last_name: 'Mustermann',
    email: 'max.mustermann@example.com',
    phone: '+49 123 456789',
    message: 'Ich interessiere mich für Ihre Heizöl-Lieferungen und hätte gerne ein individuelles Angebot.'
  };

  const sampleOrderData = {
    street: 'Musterstraße 123',
    postcode: '80331',
    city_postcode: '80331 München',
    product: 'heizoel-el',
    quantity: 2000,
    delivery_points: 2,
    delivery_time: 'week',
    message: 'Bitte Lieferung zwischen 8-12 Uhr.',
    company: 'Beispiel AG',
    first_name: 'Anna',
    last_name: 'Beispiel',
    email: 'anna.beispiel@example.com',
    phone: '+49 987 654321'
  };

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('email_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings({
          id: data.id,
          sender_name: data.sender_name,
          sender_email: data.sender_email,
          api_key: data.api_key
        });
      }
    } catch (error: any) {
      console.error('Error loading email settings:', error);
      toast({
        title: "Fehler",
        description: "E-Mail-Einstellungen konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings.sender_name || !settings.sender_email || !settings.api_key) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      let result;
      if (settings.id) {
        // Update existing settings
        result = await supabase
          .from('email_settings')
          .update({
            sender_name: settings.sender_name,
            sender_email: settings.sender_email,
            api_key: settings.api_key
          })
          .eq('id', settings.id)
          .select()
          .single();
      } else {
        // Insert new settings
        result = await supabase
          .from('email_settings')
          .insert({
            sender_name: settings.sender_name,
            sender_email: settings.sender_email,
            api_key: settings.api_key
          })
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      setSettings(prev => ({ ...prev, id: result.data.id }));
      
      toast({
        title: "Erfolg",
        description: "E-Mail-Einstellungen wurden gespeichert.",
      });
    } catch (error: any) {
      console.error('Error saving email settings:', error);
      toast({
        title: "Fehler",
        description: "E-Mail-Einstellungen konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const generateContactPreview = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bestätigung Ihrer Kontaktanfrage</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0c2a3e 0%, #1e3a52 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: #22c55e; margin: 0; font-size: 28px; font-weight: bold;">
          NEUMANN
        </h1>
      <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">
        Bestätigung Ihrer Kontaktanfrage
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      <h2 style="color: #0c2a3e; margin: 0 0 20px 0; font-size: 24px;">
        Vielen Dank für Ihre Nachricht!
      </h2>
      
      <p style="color: #64748b; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
        Wir haben Ihre Kontaktanfrage erfolgreich erhalten und werden uns schnellstmöglich bei Ihnen melden.
      </p>

      <!-- Contact Details -->
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0c2a3e;">
        <h3 style="color: #0c2a3e; margin: 0 0 15px 0; font-size: 18px;">Ihre übermittelten Daten:</h3>
        
          
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Unternehmen:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleContactData.company}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Name:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleContactData.first_name} ${sampleContactData.last_name}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">E-Mail:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleContactData.email}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Telefon:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleContactData.phone}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Nachricht:</strong>
          <div style="color: #64748b; margin-top: 8px; padding: 12px; background-color: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0;">
            ${sampleContactData.message}
          </div>
        </div>
      </div>

      <p style="color: #64748b; line-height: 1.6; margin: 25px 0; font-size: 16px;">
        Unser Team wird Ihre Anfrage prüfen und sich innerhalb der nächsten 24 Stunden bei Ihnen melden.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <div style="margin-bottom: 15px;">
        <strong style="color: #0c2a3e; font-size: 16px;">Neumann Lubrikat GmbH</strong>
      </div>
      <div style="color: #64748b; font-size: 14px; line-height: 1.5;">
        Dachsteinstr. 14 • 81825 München<br/>
        Telefon: +49 (0) 89 123456789<br/>
        <a href="mailto:info@neumann-energie.de" style="color: #0c2a3e; text-decoration: none;">info@neumann-energie.de</a>
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  const generateOrderPreview = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bestätigung Ihrer Bestellung</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0c2a3e 0%, #1e3a52 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: #22c55e; margin: 0; font-size: 28px; font-weight: bold;">
          NEUMANN
        </h1>
      <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">
        Bestätigung Ihrer Bestellanfrage
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      <h2 style="color: #0c2a3e; margin: 0 0 20px 0; font-size: 24px;">
        Vielen Dank für Ihre Bestellung!
      </h2>
      
      <p style="color: #64748b; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
        Wir haben Ihre Bestellanfrage erfolgreich erhalten und werden uns schnellstmöglich mit einem individuellen Angebot bei Ihnen melden.
      </p>

      <!-- Order Details -->
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0c2a3e;">
        <h3 style="color: #0c2a3e; margin: 0 0 15px 0; font-size: 18px;">Ihre Bestelldaten:</h3>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Produkt:</strong>
          <span style="color: #64748b; margin-left: 8px;">Heizöl EL</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Menge:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleOrderData.quantity} Liter</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Abladestellen:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleOrderData.delivery_points}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Gewünschte Lieferzeit:</strong>
          <span style="color: #64748b; margin-left: 8px;">Innerhalb einer Woche</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Nachricht:</strong>
          <div style="color: #64748b; margin-top: 8px; padding: 12px; background-color: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0;">
            ${sampleOrderData.message}
          </div>
        </div>
      </div>

      <!-- Contact Details -->
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0c2a3e;">
        <h3 style="color: #0c2a3e; margin: 0 0 15px 0; font-size: 18px;">Ihre Kontaktdaten:</h3>
        
          
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Unternehmen:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleOrderData.company}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Name:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleOrderData.first_name} ${sampleOrderData.last_name}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">E-Mail:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleOrderData.email}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Telefon:</strong>
          <span style="color: #64748b; margin-left: 8px;">${sampleOrderData.phone}</span>
        </div>
      </div>

      <p style="color: #64748b; line-height: 1.6; margin: 25px 0; font-size: 16px;">
        Unser Team wird Ihre Anfrage prüfen und Ihnen innerhalb der nächsten 24 Stunden ein individuelles Angebot unterbreiten.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <div style="margin-bottom: 15px;">
        <strong style="color: #0c2a3e; font-size: 16px;">Neumann Lubrikat GmbH</strong>
      </div>
      <div style="color: #64748b; font-size: 14px; line-height: 1.5;">
        Dachsteinstr. 14 • 81825 München<br/>
        Telefon: +49 (0) 89 123456789<br/>
        <a href="mailto:info@neumann-energie.de" style="color: #0c2a3e; text-decoration: none;">info@neumann-energie.de</a>
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  useEffect(() => {
    loadSettings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resend Konfiguration</h1>
          <p className="text-muted-foreground">
            E-Mail-Einstellungen für automatische Bestätigungsmails
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          E-Mail Setup
        </Badge>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            E-Mail-Einstellungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sender_name">Absendername</Label>
              <Input
                id="sender_name"
                value={settings.sender_name}
                onChange={(e) => setSettings(prev => ({ ...prev, sender_name: e.target.value }))}
                placeholder="z.B. Neumann Energie"
              />
            </div>
            <div>
              <Label htmlFor="sender_email">Absender E-Mail</Label>
              <Input
                id="sender_email"
                type="email"
                value={settings.sender_email}
                onChange={(e) => setSettings(prev => ({ ...prev, sender_email: e.target.value }))}
                placeholder="z.B. noreply@neumann-energie.de"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="api_key">Resend API Key</Label>
            <Input
              id="api_key"
              type="password"
              value={settings.api_key}
              onChange={(e) => setSettings(prev => ({ ...prev, api_key: e.target.value }))}
              placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>
          <Button 
            onClick={saveSettings} 
            disabled={isSaving}
            className="w-full md:w-auto"
          >
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Speichere...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Einstellungen speichern
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Email Previews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            E-Mail Vorschau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contact">Kontakt E-Mail</TabsTrigger>
              <TabsTrigger value="order">Bestell E-Mail</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact" className="mt-4">
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Kontaktanfrage Bestätigung</h3>
                  <Badge variant="secondary">Vorschau</Badge>
                </div>
                <div 
                  className="bg-white border rounded p-4 max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: generateContactPreview() }}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="order" className="mt-4">
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Bestellanfrage Bestätigung</h3>
                  <Badge variant="secondary">Vorschau</Badge>
                </div>
                <div 
                  className="bg-white border rounded p-4 max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: generateOrderPreview() }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminResend;