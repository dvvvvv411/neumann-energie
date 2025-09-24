import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Cookies = () => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const handleSavePreferences = () => {
    // Save cookie preferences
    localStorage.setItem('cookie-analytics', analyticsEnabled.toString());
    localStorage.setItem('cookie-marketing', marketingEnabled.toString());
    
    // Show success message or toast
    console.log('Cookie-Einstellungen gespeichert:', { analyticsEnabled, marketingEnabled });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Cookie-Richtlinie
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Cookie-Einstellungen
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Verwalten Sie Ihre Cookie-Präferenzen und erfahren Sie, wie wir Cookies verwenden
            </p>
          </div>

          <div className="space-y-6">
            {/* Was sind Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Was sind Cookies?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies sind kleine Textdateien, die von Ihrem Webbrowser auf Ihrem Gerät gespeichert werden, 
                  wenn Sie unsere Website besuchen. Sie helfen uns dabei, die Website funktionsfähig zu machen, 
                  die Sicherheit zu erhöhen, eine bessere Benutzererfahrung zu bieten und zu verstehen, 
                  wie die Website verwendet wird.
                </p>
              </CardContent>
            </Card>

            {/* Notwendige Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Notwendige Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Immer aktiv</h4>
                    <p className="text-muted-foreground text-sm">
                      Diese Cookies sind für das Funktionieren der Website unerlässlich.
                    </p>
                  </div>
                  <Switch checked={true} disabled />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Notwendige Cookies ermöglichen grundlegende Funktionen wie Seitennavigation und 
                  Zugriff auf sichere Bereiche der Website. Die Website kann ohne diese Cookies 
                  nicht ordnungsgemäß funktionieren.
                </p>
              </CardContent>
            </Card>

            {/* Analyse-Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Analyse-Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Analytics</h4>
                    <p className="text-muted-foreground text-sm">
                      Helfen uns zu verstehen, wie Besucher unsere Website nutzen.
                    </p>
                  </div>
                  <Switch 
                    checked={analyticsEnabled} 
                    onCheckedChange={setAnalyticsEnabled}
                  />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Diese Cookies sammeln Informationen darüber, wie Besucher eine Website nutzen, 
                  z.B. welche Seiten sie am häufigsten besuchen und ob sie Fehlermeldungen von 
                  Webseiten erhalten. Alle von diesen Cookies gesammelten Informationen sind aggregiert 
                  und daher anonym.
                </p>
              </CardContent>
            </Card>

            {/* Marketing-Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Marketing-Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Werbung & Marketing</h4>
                    <p className="text-muted-foreground text-sm">
                      Für personalisierte Werbung und relevante Inhalte.
                    </p>
                  </div>
                  <Switch 
                    checked={marketingEnabled} 
                    onCheckedChange={setMarketingEnabled}
                  />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Marketing-Cookies werden verwendet, um Besuchern auf Webseiten zu folgen. 
                  Die Absicht ist, Anzeigen zu schalten, die relevant und ansprechend für den 
                  einzelnen Benutzer sind und dadurch wertvoller für Publisher und werbetreibende 
                  Drittparteien sind.
                </p>
              </CardContent>
            </Card>

            {/* Cookie-Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Verwendete Cookies im Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground">Session-Cookies</h4>
                    <p className="text-muted-foreground text-sm">
                      Zweck: Funktionalität der Website | Speicherdauer: Bis zum Ende der Browser-Session
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Cookie-Präferenzen</h4>
                    <p className="text-muted-foreground text-sm">
                      Zweck: Speicherung Ihrer Cookie-Einstellungen | Speicherdauer: 1 Jahr
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Google Analytics (optional)</h4>
                    <p className="text-muted-foreground text-sm">
                      Zweck: Website-Analyse und Verbesserung | Speicherdauer: 2 Jahre
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Einstellungen speichern */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Einstellungen speichern</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSavePreferences} className="flex-1">
                    Einstellungen speichern
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setAnalyticsEnabled(true);
                      setMarketingEnabled(true);
                    }}
                    className="flex-1"
                  >
                    Alle akzeptieren
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setAnalyticsEnabled(false);
                      setMarketingEnabled(false);
                    }}
                    className="flex-1"
                  >
                    Alle ablehnen
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie diese Seite erneut besuchen.
                </p>
              </CardContent>
            </Card>

            {/* Kontakt */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Fragen zu Cookies?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bei Fragen zu unserer Cookie-Richtlinie wenden Sie sich gerne an uns:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mt-4">
                  <p className="text-muted-foreground">
                    <strong>Neumann Lubrikat GmbH</strong><br/>
                    Dachsteinstr. 14<br/>
                    81825 München<br/>
                    Deutschland<br/><br/>
                    E-Mail: <a href="mailto:info@neumann-energie.de" className="text-primary hover:underline">info@neumann-energie.de</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;