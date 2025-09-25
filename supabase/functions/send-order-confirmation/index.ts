import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  // Order details
  street: string;
  postcode: string;
  city_postcode: string;
  product: string;
  quantity: number;
  delivery_points: number;
  delivery_time: string;
  message?: string;
  // Personal details
  company?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Order confirmation email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get email settings from database
    const { data: emailSettings, error: settingsError } = await supabase
      .from('email_settings')
      .select('*')
      .single();

    if (settingsError || !emailSettings) {
      console.error("No email settings found:", settingsError);
      return new Response(
        JSON.stringify({ error: "Email settings not configured" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const orderData: OrderEmailRequest = await req.json();

    console.log("Sending order confirmation to:", orderData.email);

    const getProductName = (product: string) => {
      const productMap: { [key: string]: string } = {
        'heizoel-el': 'Heizöl EL',
        'heizoel-els': 'Heizöl EL schwefelarm',
        'diesel': 'Diesel',
        'biodiesel': 'Biodiesel',
      };
      return productMap[product] || product;
    };

    const getDeliveryTime = (time: string) => {
      const timeMap: { [key: string]: string } = {
        'asap': 'Schnellstmöglich',
        'week': 'Innerhalb einer Woche',
        'month': 'Innerhalb eines Monats',
        'flexible': 'Flexibel',
      };
      return timeMap[time] || time;
    };

    const emailHtml = `
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
          <span style="color: #64748b; margin-left: 8px;">${getProductName(orderData.product)}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Menge:</strong>
          <span style="color: #64748b; margin-left: 8px;">${orderData.quantity} Liter</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Abladestellen:</strong>
          <span style="color: #64748b; margin-left: 8px;">${orderData.delivery_points}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Gewünschte Lieferzeit:</strong>
          <span style="color: #64748b; margin-left: 8px;">${getDeliveryTime(orderData.delivery_time)}</span>
        </div>
        
        ${orderData.message ? `
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Nachricht:</strong>
          <div style="color: #64748b; margin-top: 8px; padding: 12px; background-color: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0;">
            ${orderData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        ` : ''}
      </div>

      <!-- Contact Details -->
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0c2a3e;">
        <h3 style="color: #0c2a3e; margin: 0 0 15px 0; font-size: 18px;">Ihre Kontaktdaten:</h3>
        
        
        ${orderData.company ? `
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Unternehmen:</strong>
          <span style="color: #64748b; margin-left: 8px;">${orderData.company}</span>
        </div>
        ` : ''}
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Name:</strong>
          <span style="color: #64748b; margin-left: 8px;">${orderData.first_name} ${orderData.last_name}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">E-Mail:</strong>
          <span style="color: #64748b; margin-left: 8px;">${orderData.email}</span>
        </div>
        
        <div style="margin: 12px 0;">
          <strong style="color: #475569;">Telefon:</strong>
          <span style="color: #64748b; margin-left: 8px;">${orderData.phone}</span>
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

    // Send email using Resend API directly with fetch
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${emailSettings.api_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${emailSettings.sender_name} <${emailSettings.sender_email}>`,
        to: [orderData.email],
        subject: "Bestätigung Ihrer Bestellanfrage - Neumann Energie",
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const result = await emailResponse.json();

    console.log("Order confirmation email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);