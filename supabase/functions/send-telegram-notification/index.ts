import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TelegramNotificationRequest {
  type: 'anfrage' | 'bestellung' | 'test';
  data?: any;
  message?: string;
}

interface TelegramSettings {
  bot_token: string;
  is_active: boolean;
}

interface TelegramChatId {
  chat_id: string;
  chat_name: string;
  is_active: boolean;
  notification_types: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { type, data, message }: TelegramNotificationRequest = await req.json();

    console.log(`Processing Telegram notification: ${type}`);

    // Get Telegram settings
    const { data: settings, error: settingsError } = await supabase
      .from("telegram_settings")
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .single();

    if (settingsError || !settings) {
      console.log("No active Telegram settings found");
      return new Response(
        JSON.stringify({ error: "Telegram bot not configured or inactive" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get relevant chat IDs based on notification type
    const notificationType = type === 'test' ? 'anfragen' : 
                           type === 'anfrage' ? 'anfragen' : 'bestellungen';
    
    const { data: chatIds, error: chatError } = await supabase
      .from("telegram_chat_ids")
      .select("*")
      .eq("is_active", true)
      .contains("notification_types", [notificationType]);

    if (chatError || !chatIds || chatIds.length === 0) {
      console.log(`No active chat IDs found for type: ${notificationType}`);
      return new Response(
        JSON.stringify({ error: "No active chat IDs configured" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate message based on type
    let messageText = "";
    
    if (type === 'test') {
      messageText = message || "🤖 Test-Nachricht vom Neumann Energie Admin System";
    } else if (type === 'anfrage') {
      messageText = `🔔 **Neue Kontaktanfrage**

👤 **Kontakt:** ${data.salutation} ${data.first_name} ${data.last_name}
🏢 **Firma:** ${data.company}
📧 **E-Mail:** ${data.email}
📞 **Telefon:** ${data.phone}

💬 **Nachricht:**
${data.message}

⏰ **Eingegangen:** ${new Date().toLocaleString('de-DE')}

🔗 [Admin Panel öffnen](${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app')}/admin/anfragen)`;
    } else if (type === 'bestellung') {
      messageText = `🛒 **Neue Bestellung**

👤 **Kunde:** ${data.first_name} ${data.last_name}${data.company ? ` (${data.company})` : ''}
📧 **E-Mail:** ${data.email}
📞 **Telefon:** ${data.phone}

🛢️ **Produkt:** ${data.product}
📦 **Menge:** ${data.quantity} Liter
🏠 **PLZ:** ${data.postcode}
📍 **Adresse:** ${data.street}, ${data.city_postcode}
🚚 **Abladestellen:** ${data.delivery_points}
⚡ **Lieferzeit:** ${data.delivery_time}

${data.message ? `📝 **Nachricht:** ${data.message}\n\n` : ''}⏰ **Bestellt:** ${new Date().toLocaleString('de-DE')}

🔗 [Admin Panel öffnen](${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app')}/admin/bestellungen)`;
    }

    // Send message to all active chat IDs
    const results = [];
    
    for (const chat of chatIds) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${settings.bot_token}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chat.chat_id,
            text: messageText,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
          }),
        });

        const result = await response.json();
        
        if (response.ok) {
          console.log(`Message sent successfully to ${chat.chat_name} (${chat.chat_id})`);
          results.push({
            chat_id: chat.chat_id,
            chat_name: chat.chat_name,
            success: true,
            message_id: result.message_id
          });
        } else {
          console.error(`Failed to send message to ${chat.chat_name}:`, result);
          results.push({
            chat_id: chat.chat_id,
            chat_name: chat.chat_name,
            success: false,
            error: result.description || 'Unknown error'
          });
        }
      } catch (error) {
        console.error(`Error sending to ${chat.chat_name}:`, error);
        results.push({
          chat_id: chat.chat_id,
          chat_name: chat.chat_name,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;

    console.log(`Notification summary: ${successCount}/${totalCount} messages sent successfully`);

    return new Response(
      JSON.stringify({
        success: true,
        results: results,
        summary: {
          total: totalCount,
          successful: successCount,
          failed: totalCount - successCount
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-telegram-notification function:", error);
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