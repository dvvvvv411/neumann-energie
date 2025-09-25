import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut,
  TrendingUp,
  Package,
  Calendar
} from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Abmeldung fehlgeschlagen",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolgreich abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet.",
      });
      navigate("/auth");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Check if we're on a sub-route
  const isSubRoute = location.pathname !== '/admin';

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-card border-b border-border sticky top-0 z-50">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <div>
                    <h1 className="text-xl font-bold text-foreground">
                      {isSubRoute ? 'Admin Panel' : 'Admin Dashboard'}
                    </h1>
                    <p className="text-sm text-muted-foreground">Willkommen, {user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="rounded-lg"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {isSubRoute ? (
              <Outlet />
            ) : (
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Willkommen im Neumann Energie Dashboard
                  </h2>
                  <p className="text-muted-foreground">
                    Hier finden Sie alle wichtigen Informationen und Funktionen für die Verwaltung.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Gesamtbestellungen</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">1,234</div>
                      <p className="text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        +12% seit letztem Monat
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Aktive Kunden</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">567</div>
                      <p className="text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        +8% seit letztem Monat
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Lagerbestand</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">89,432L</div>
                      <p className="text-xs text-muted-foreground">
                        Heizöl verfügbar
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Termine heute</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">12</div>
                      <p className="text-xs text-muted-foreground">
                        Liefertermine geplant
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Dashboard Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
                        Letzte Bestellungen
                      </CardTitle>
                      <CardDescription>
                        Übersicht der neuesten Kundenbestellungen
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">Bestellung #{2000 + i}</p>
                              <p className="text-sm text-muted-foreground">Kunde: Max Mustermann</p>
                            </div>
                            <Badge variant="secondary" className="rounded-lg">
                              In Bearbeitung
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Analytics */}
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                        Verkaufsanalyse
                      </CardTitle>
                      <CardDescription>
                        Monatliche Umsatzentwicklung
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Diagramm-Platzhalter</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Management */}
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-primary" />
                        Kundenverwaltung
                      </CardTitle>
                      <CardDescription>
                        Aktuelle Kundendaten und -aktivitäten
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                            <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">MM</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Max Mustermann</p>
                              <p className="text-sm text-muted-foreground">Letzte Bestellung: vor 2 Tagen</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Settings */}
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-primary" />
                        System-Einstellungen
                      </CardTitle>
                      <CardDescription>
                        Konfiguration und Verwaltung
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start rounded-lg">
                          Preise verwalten
                        </Button>
                        <Button variant="outline" className="w-full justify-start rounded-lg">
                          Liefergebiete konfigurieren
                        </Button>
                        <Button variant="outline" className="w-full justify-start rounded-lg">
                          Benutzer verwalten
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}