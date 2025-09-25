import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Send, Plus, Trash2, MessageCircle, Settings, Bot } from "lucide-react";
import { Navigate } from "react-router-dom";

interface TelegramSettings {
  id: string;
  bot_token: string;
  is_active: boolean;
}

interface TelegramChatId {
  id: string;
  chat_id: string;
  chat_name: string;
  is_active: boolean;
  notification_types: string[];
}

export default function AdminTelegram() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<TelegramSettings | null>(null);
  const [chatIds, setChatIds] = useState<TelegramChatId[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [botToken, setBotToken] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isAddChatOpen, setIsAddChatOpen] = useState(false);
  const [newChatId, setNewChatId] = useState("");
  const [newChatName, setNewChatName] = useState("");
  const [newNotificationTypes, setNewNotificationTypes] = useState<string[]>(["anfragen", "bestellungen"]);

  useEffect(() => {
    if (user) {
      fetchSettings();
      fetchChatIds();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("telegram_settings")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setSettings(data);
        setBotToken(data.bot_token);
        setIsActive(data.is_active);
      }
    } catch (error) {
      console.error("Error fetching telegram settings:", error);
      toast.error("Fehler beim Laden der Telegram-Einstellungen");
    }
  };

  const fetchChatIds = async () => {
    try {
      const { data, error } = await supabase
        .from("telegram_chat_ids")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setChatIds(data || []);
    } catch (error) {
      console.error("Error fetching chat IDs:", error);
      toast.error("Fehler beim Laden der Chat-IDs");
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!botToken.trim()) {
      toast.error("Bitte Bot Token eingeben");
      return;
    }

    setSaving(true);
    try {
      const settingsData = {
        bot_token: botToken.trim(),
        is_active: isActive,
      };

      if (settings) {
        const { error } = await supabase
          .from("telegram_settings")
          .update(settingsData)
          .eq("id", settings.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("telegram_settings")
          .insert(settingsData)
          .select()
          .single();

        if (error) throw error;
        setSettings(data);
      }

      toast.success("Einstellungen gespeichert");
      fetchSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Fehler beim Speichern der Einstellungen");
    } finally {
      setSaving(false);
    }
  };

  const testBot = async () => {
    if (!botToken.trim()) {
      toast.error("Bitte Bot Token eingeben und speichern");
      return;
    }

    if (chatIds.length === 0) {
      toast.error("Bitte mindestens eine Chat-ID hinzufügen");
      return;
    }

    setTesting(true);
    try {
      const { error } = await supabase.functions.invoke("send-telegram-notification", {
        body: {
          type: "test",
          message: "🤖 Test-Nachricht vom Neumann Energie Admin System\n\n✅ Telegram Bot ist erfolgreich konfiguriert!"
        }
      });

      if (error) throw error;
      toast.success("Test-Nachrichten gesendet");
    } catch (error) {
      console.error("Error testing bot:", error);
      toast.error("Fehler beim Testen des Bots");
    } finally {
      setTesting(false);
    }
  };

  const addChatId = async () => {
    if (!newChatId.trim() || !newChatName.trim()) {
      toast.error("Bitte Chat-ID und Namen eingeben");
      return;
    }

    try {
      const { error } = await supabase
        .from("telegram_chat_ids")
        .insert({
          chat_id: newChatId.trim(),
          chat_name: newChatName.trim(),
          notification_types: newNotificationTypes,
        });

      if (error) throw error;

      toast.success("Chat-ID hinzugefügt");
      setIsAddChatOpen(false);
      setNewChatId("");
      setNewChatName("");
      setNewNotificationTypes(["anfragen", "bestellungen"]);
      fetchChatIds();
    } catch (error) {
      console.error("Error adding chat ID:", error);
      toast.error("Fehler beim Hinzufügen der Chat-ID");
    }
  };

  const updateChatId = async (id: string, updates: Partial<TelegramChatId>) => {
    try {
      const { error } = await supabase
        .from("telegram_chat_ids")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast.success("Chat-ID aktualisiert");
      fetchChatIds();
    } catch (error) {
      console.error("Error updating chat ID:", error);
      toast.error("Fehler beim Aktualisieren der Chat-ID");
    }
  };

  const deleteChatId = async (id: string) => {
    try {
      const { error } = await supabase
        .from("telegram_chat_ids")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Chat-ID gelöscht");
      fetchChatIds();
    } catch (error) {
      console.error("Error deleting chat ID:", error);
      toast.error("Fehler beim Löschen der Chat-ID");
    }
  };

  const handleNotificationTypeChange = (chatId: string, type: string, checked: boolean) => {
    const chatData = chatIds.find(c => c.id === chatId);
    if (!chatData) return;

    let newTypes = [...chatData.notification_types];
    if (checked) {
      if (!newTypes.includes(type)) {
        newTypes.push(type);
      }
    } else {
      newTypes = newTypes.filter(t => t !== type);
    }

    updateChatId(chatId, { notification_types: newTypes });
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">Lade Telegram-Einstellungen...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          Telegram Bot Konfiguration
        </h1>
        <p className="text-muted-foreground">
          Konfigurieren Sie Ihren Telegram Bot für automatische Benachrichtigungen bei neuen Anfragen und Bestellungen.
        </p>
      </div>

      {/* Bot Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Bot Einstellungen
          </CardTitle>
          <CardDescription>
            Telegram Bot Token und Aktivierungsstatus verwalten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bot-token">Bot Token</Label>
            <Input
              id="bot-token"
              type="password"
              placeholder="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Erstellen Sie einen Bot mit @BotFather auf Telegram und fügen Sie hier den Token ein.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Bot aktiviert</Label>
              <p className="text-sm text-muted-foreground">
                Bot für automatische Benachrichtigungen aktivieren
              </p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <div className="flex gap-2">
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? "Speichert..." : "Einstellungen speichern"}
            </Button>
            <Button variant="outline" onClick={testBot} disabled={testing || !settings?.is_active}>
              <Send className="h-4 w-4 mr-2" />
              {testing ? "Testet..." : "Bot testen"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat IDs Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat-IDs verwalten
          </CardTitle>
          <CardDescription>
            Fügen Sie Chat-IDs hinzu, an die Benachrichtigungen gesendet werden sollen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              {chatIds.length} Chat-ID(s) konfiguriert
            </p>
            <Dialog open={isAddChatOpen} onOpenChange={setIsAddChatOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Chat-ID hinzufügen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Neue Chat-ID hinzufügen</DialogTitle>
                  <DialogDescription>
                    Fügen Sie eine neue Telegram Chat-ID für Benachrichtigungen hinzu
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chat-id">Chat-ID</Label>
                    <Input
                      id="chat-id"
                      placeholder="z.B. 123456789 oder -100123456789"
                      value={newChatId}
                      onChange={(e) => setNewChatId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chat-name">Name</Label>
                    <Input
                      id="chat-name"
                      placeholder="z.B. Martin's Handy"
                      value={newChatName}
                      onChange={(e) => setNewChatName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Benachrichtigungstypen</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anfragen"
                          checked={newNotificationTypes.includes("anfragen")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewNotificationTypes([...newNotificationTypes, "anfragen"]);
                            } else {
                              setNewNotificationTypes(newNotificationTypes.filter(t => t !== "anfragen"));
                            }
                          }}
                        />
                        <Label htmlFor="anfragen">Anfragen</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bestellungen"
                          checked={newNotificationTypes.includes("bestellungen")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewNotificationTypes([...newNotificationTypes, "bestellungen"]);
                            } else {
                              setNewNotificationTypes(newNotificationTypes.filter(t => t !== "bestellungen"));
                            }
                          }}
                        />
                        <Label htmlFor="bestellungen">Bestellungen</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddChatOpen(false)}>
                    Abbrechen
                  </Button>
                  <Button onClick={addChatId}>
                    Hinzufügen
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {chatIds.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Chat-ID</TableHead>
                  <TableHead>Benachrichtigungen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chatIds.map((chat) => (
                  <TableRow key={chat.id}>
                    <TableCell className="font-medium">{chat.chat_name}</TableCell>
                    <TableCell className="font-mono text-sm">{chat.chat_id}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={chat.notification_types.includes("anfragen")}
                            onCheckedChange={(checked) => 
                              handleNotificationTypeChange(chat.id, "anfragen", checked as boolean)
                            }
                          />
                          <span className="text-sm">Anfragen</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={chat.notification_types.includes("bestellungen")}
                            onCheckedChange={(checked) => 
                              handleNotificationTypeChange(chat.id, "bestellungen", checked as boolean)
                            }
                          />
                          <span className="text-sm">Bestellungen</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={chat.is_active}
                        onCheckedChange={(checked) => updateChatId(chat.id, { is_active: checked })}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteChatId(chat.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Keine Chat-IDs konfiguriert</p>
              <p className="text-sm">Fügen Sie Chat-IDs hinzu, um Benachrichtigungen zu erhalten</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}