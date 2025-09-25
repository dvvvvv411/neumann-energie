import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, RefreshCw, Settings, Eye, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ImapSettings {
  id?: string;
  host: string;
  port: number;
  username: string;
  password: string;
  use_tls: boolean;
  is_active: boolean;
}

interface CachedEmail {
  id: string;
  message_id: string;
  subject: string | null;
  sender: string;
  recipient: string | null;
  body_plain: string | null;
  body_html: string | null;
  received_date: string | null;
  is_read: boolean;
  folder: string;
}

export default function AdminEmails() {
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [settings, setSettings] = useState<ImapSettings>({
    host: "",
    port: 993,
    username: "",
    password: "",
    use_tls: true,
    is_active: false,
  });
  const [emails, setEmails] = useState<CachedEmail[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<CachedEmail | null>(null);

  useEffect(() => {
    loadSettings();
    loadEmails();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("imap_settings")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error("Error loading IMAP settings:", error);
    }
  };

  const loadEmails = async () => {
    try {
      const { data, error } = await supabase
        .from("cached_emails")
        .select("*")
        .order("received_date", { ascending: false });

      if (error) throw error;
      setEmails(data || []);
    } catch (error) {
      console.error("Error loading emails:", error);
      toast({
        title: "Fehler",
        description: "E-Mails konnten nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  const saveSettings = async () => {
    if (!settings.host || !settings.username || !settings.password) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Deactivate all existing settings first
      await supabase
        .from("imap_settings")
        .update({ is_active: false })
        .neq("id", "00000000-0000-0000-0000-000000000000");

      const { error } = await supabase
        .from("imap_settings")
        .upsert({
          ...settings,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "Erfolgreich",
        description: "IMAP-Einstellungen wurden gespeichert.",
      });
      
      setShowSettings(false);
      await loadSettings();
    } catch (error) {
      console.error("Error saving IMAP settings:", error);
      toast({
        title: "Fehler",
        description: "Einstellungen konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmails = async () => {
    if (!settings.host || !settings.username) {
      toast({
        title: "Fehler",
        description: "Bitte konfigurieren Sie zuerst die IMAP-Einstellungen.",
        variant: "destructive",
      });
      return;
    }

    setIsFetching(true);
    try {
      const { data, error } = await supabase.functions.invoke("fetch-emails", {
        body: { imapSettings: settings },
      });

      if (error) throw error;

      toast({
        title: "Erfolgreich",
        description: `${data.newEmails || 0} neue E-Mails abgerufen.`,
      });

      await loadEmails();
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast({
        title: "Fehler",
        description: "E-Mails konnten nicht abgerufen werden.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const markAsRead = async (email: CachedEmail) => {
    if (email.is_read) return;

    try {
      await supabase
        .from("cached_emails")
        .update({ is_read: true })
        .eq("id", email.id);

      setEmails(emails.map(e => e.id === email.id ? { ...e, is_read: true } : e));
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  const selectEmail = (email: CachedEmail) => {
    setSelectedEmail(email);
    markAsRead(email);
  };

  if (showSettings) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-6 w-6" />
          <h1 className="text-2xl font-bold">IMAP-Einstellungen</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>E-Mail Server Konfiguration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="host">IMAP Server *</Label>
                <Input
                  id="host"
                  placeholder="imap.gmail.com"
                  value={settings.host}
                  onChange={(e) =>
                    setSettings({ ...settings, host: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  type="number"
                  value={settings.port}
                  onChange={(e) =>
                    setSettings({ ...settings, port: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="username">Benutzername (E-Mail) *</Label>
              <Input
                id="username"
                type="email"
                placeholder="ihr@email.com"
                value={settings.username}
                onChange={(e) =>
                  setSettings({ ...settings, username: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="password">Passwort *</Label>
              <Input
                id="password"
                type="password"
                value={settings.password}
                onChange={(e) =>
                  setSettings({ ...settings, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="tls"
                checked={settings.use_tls}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, use_tls: checked })
                }
              />
              <Label htmlFor="tls">TLS/SSL verwenden</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={saveSettings}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Einstellungen speichern
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
              >
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            <h1 className="text-2xl font-bold">E-Mail Postfach</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchEmails}
              disabled={isFetching}
              variant="outline"
            >
              {isFetching ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Aktualisieren
            </Button>
            <Button onClick={() => setShowSettings(true)} variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Einstellungen
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Email List */}
        <div className="w-2/5 border-r">
          <ScrollArea className="h-full">
            <div className="p-4">
              {emails.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Keine E-Mails vorhanden</p>
                  <p className="text-sm">
                    Konfigurieren Sie IMAP und aktualisieren Sie das Postfach
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {emails.map((email) => (
                    <Card
                      key={email.id}
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedEmail?.id === email.id ? "bg-muted" : ""
                      } ${!email.is_read ? "border-l-4 border-l-primary" : ""}`}
                      onClick={() => selectEmail(email)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-medium truncate pr-2">
                            {email.sender}
                          </div>
                          {!email.is_read && (
                            <Badge variant="secondary" className="text-xs">
                              Neu
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm font-medium mb-1 truncate">
                          {email.subject || "(Kein Betreff)"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {email.received_date
                            ? format(new Date(email.received_date), "dd.MM.yyyy HH:mm")
                            : "Unbekannt"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Email Preview */}
        <div className="flex-1">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    {selectedEmail.subject || "(Kein Betreff)"}
                  </h2>
                  <Badge variant={selectedEmail.is_read ? "secondary" : "default"}>
                    {selectedEmail.is_read ? "Gelesen" : "Neu"}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <strong>Von:</strong> {selectedEmail.sender}
                  </div>
                  {selectedEmail.recipient && (
                    <div>
                      <strong>An:</strong> {selectedEmail.recipient}
                    </div>
                  )}
                  <div>
                    <strong>Datum:</strong>{" "}
                    {selectedEmail.received_date
                      ? format(new Date(selectedEmail.received_date), "dd.MM.yyyy HH:mm")
                      : "Unbekannt"}
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-6">
                  {selectedEmail.body_html ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: selectedEmail.body_html }}
                      className="prose max-w-none"
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans">
                      {selectedEmail.body_plain || "Keine Inhalte verfügbar"}
                    </pre>
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div className="text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Wählen Sie eine E-Mail aus der Liste aus</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}