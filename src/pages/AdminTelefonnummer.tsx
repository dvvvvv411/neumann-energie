import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Save, Loader2 } from "lucide-react";
import { usePhoneSettings } from "@/hooks/usePhoneSettings";

export default function AdminTelefonnummer() {
  const { phoneSettings, loading, updatePhoneSettings } = usePhoneSettings();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (phoneSettings) {
      setPhoneNumber(phoneSettings.phone_number);
    }
  }, [phoneSettings]);

  const handleSave = async () => {
    if (!phoneNumber.trim()) return;
    
    setSaving(true);
    const success = await updatePhoneSettings(phoneNumber);
    setSaving(false);
  };

  const formatTelLink = (phone: string) => {
    return phone.replace(/[\s-]/g, '');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Phone className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Telefonnummer-Einstellungen</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Telefonnummer verwalten</CardTitle>
          <CardDescription>
            Ändern Sie hier die Telefonnummer, die auf der Website angezeigt wird. 
            Diese wird automatisch auf der Startseite und im Impressum übernommen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="z.B. 0228 512-710"
              className="max-w-md"
            />
          </div>

          {phoneNumber && (
            <div className="space-y-2">
              <Label>Vorschau</Label>
              <div className="p-3 bg-muted rounded-md max-w-md">
                <p className="text-sm text-muted-foreground mb-1">Anzeige:</p>
                <p className="font-medium">{phoneNumber}</p>
                <p className="text-sm text-muted-foreground mt-2 mb-1">Tel-Link:</p>
                <p className="font-mono text-sm">tel:{formatTelLink(phoneNumber)}</p>
              </div>
            </div>
          )}

          <Button 
            onClick={handleSave} 
            disabled={saving || !phoneNumber.trim()}
            className="flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Speichern..." : "Speichern"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}