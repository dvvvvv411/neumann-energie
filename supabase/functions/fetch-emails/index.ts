import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Simple Buffer polyfill for Deno
(globalThis as any).Buffer = {
  from: (data: any, encoding?: string) => {
    if (typeof data === 'string') {
      return new TextEncoder().encode(data);
    }
    return data;
  },
  alloc: (size: number) => new Uint8Array(size),
  allocUnsafe: (size: number) => new Uint8Array(size),
  isBuffer: (obj: any) => obj instanceof Uint8Array,
  concat: (list: Uint8Array[]) => {
    const totalLength = list.reduce((sum, arr) => sum + arr.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const arr of list) {
      result.set(arr, offset);
      offset += arr.length;
    }
    return result;
  }
};

// Use crypto from Deno global
(globalThis as any).crypto = globalThis.crypto || {};

import { ImapFlow } from "https://esm.sh/imapflow@1.0.164";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ImapSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  use_tls: boolean;
}

interface EmailData {
  message_id: string;
  subject: string | null;
  sender: string;
  recipient: string | null;
  body_plain: string | null;
  body_html: string | null;
  received_date: Date | null;
  folder: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imapSettings }: { imapSettings: ImapSettings } = await req.json();

    if (!imapSettings || !imapSettings.host || !imapSettings.username || !imapSettings.password) {
      throw new Error("Invalid IMAP settings provided");
    }

    console.log("Connecting to IMAP server:", imapSettings.host);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Connect to IMAP server
    const client = new ImapFlow({
      host: imapSettings.host,
      port: imapSettings.port,
      secure: imapSettings.use_tls,
      auth: {
        user: imapSettings.username,
        pass: imapSettings.password,
      },
      logger: false,
    });

    await client.connect();
    console.log("Successfully connected to IMAP server");

    // Open INBOX folder
    const mailbox = await client.getMailboxLock("INBOX");
    let newEmailsCount = 0;

    try {
      // Get existing message IDs from database to avoid duplicates
      const { data: existingEmails } = await supabase
        .from("cached_emails")
        .select("message_id");

      const existingMessageIds = new Set(
        existingEmails?.map((e) => e.message_id) || []
      );

      // Fetch recent messages (last 50)
      const messages = client.fetch("1:50", {
        envelope: true,
        bodyStructure: true,
        source: false,
      });

      const emailsToInsert: EmailData[] = [];

      for await (const message of messages) {
        const messageId = message.envelope?.messageId;
        
        if (!messageId || existingMessageIds.has(messageId)) {
          continue; // Skip if no message ID or already exists
        }

        console.log(`Processing new email: ${messageId}`);

        // Get email body
        const { content: bodyContent } = await client.download(
          String(message.uid),
          "TEXT",
          { uid: true }
        );

        // Parse email content
        let bodyPlain = "";
        let bodyHtml = "";

        try {
          // Convert Node.js Readable stream to buffer
          const chunks: Uint8Array[] = [];
          
          for await (const chunk of bodyContent) {
            chunks.push(chunk);
          }
          
          // Combine chunks into single buffer
          const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
          const buffer = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk of chunks) {
            buffer.set(chunk, offset);
            offset += chunk.length;
          }
          
          const bodyText = new TextDecoder().decode(buffer);
          
          // Simple text/HTML detection - in production, you'd want a proper MIME parser
          if (bodyText.includes("<html") || bodyText.includes("<body")) {
            bodyHtml = bodyText;
          } else {
            bodyPlain = bodyText;
          }
        } catch (error) {
          console.error("Error decoding email body:", error);
          bodyPlain = "Error decoding email content";
        }

        // Extract sender and recipient
        const sender = message.envelope?.from?.[0]
          ? `${message.envelope.from[0].name || ""} <${message.envelope.from[0].address}>`.trim()
          : "Unknown Sender";

        const recipient = message.envelope?.to?.[0]
          ? `${message.envelope.to[0].name || ""} <${message.envelope.to[0].address}>`.trim()
          : null;

        const emailData: EmailData = {
          message_id: messageId,
          subject: message.envelope?.subject || null,
          sender,
          recipient,
          body_plain: bodyPlain || null,
          body_html: bodyHtml || null,
          received_date: message.envelope?.date || null,
          folder: "INBOX",
        };

        emailsToInsert.push(emailData);
        newEmailsCount++;
      }

      // Insert new emails into database
      if (emailsToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from("cached_emails")
          .insert(emailsToInsert);

        if (insertError) {
          throw insertError;
        }

        console.log(`Successfully inserted ${emailsToInsert.length} new emails`);
      }

    } finally {
      mailbox.release();
    }

    await client.logout();
    console.log("IMAP session closed");

    return new Response(
      JSON.stringify({ 
        success: true, 
        newEmails: newEmailsCount,
        message: `Processed ${newEmailsCount} new emails`
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in fetch-emails function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to fetch emails",
        details: error.toString()
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);