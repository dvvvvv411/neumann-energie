import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  ShoppingCart, 
  LogOut,
  Mail,
  Clock
} from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardStats {
  contactRequests: number;
  orders: number;
  pendingOrders: number;
  emails: number;
}

interface RecentActivity {
  id: string;
  type: 'contact' | 'order';
  name: string;
  created_at: string;
  status?: string;
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState<DashboardStats>({ contactRequests: 0, orders: 0, pendingOrders: 0, emails: 0 });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setDataLoading(true);
      
      // Fetch contact requests count
      const { count: contactRequestsCount } = await supabase
        .from('contact_requests')
        .select('*', { count: 'exact', head: true });

      // Fetch orders count and pending orders
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      const { count: pendingOrdersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch emails count
      const { count: emailsCount } = await supabase
        .from('cached_emails')
        .select('*', { count: 'exact', head: true });

      // Fetch recent activities
      const { data: recentContacts } = await supabase
        .from('contact_requests')
        .select('id, first_name, last_name, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      const { data: recentOrders } = await supabase
        .from('orders')
        .select('id, first_name, last_name, created_at, status')
        .order('created_at', { ascending: false })
        .limit(3);

      // Combine and sort recent activities
      const activities: RecentActivity[] = [
        ...(recentContacts?.map(contact => ({
          id: contact.id,
          type: 'contact' as const,
          name: `${contact.first_name} ${contact.last_name}`,
          created_at: contact.created_at
        })) || []),
        ...(recentOrders?.map(order => ({
          id: order.id,
          type: 'order' as const,
          name: `${order.first_name} ${order.last_name}`,
          created_at: order.created_at,
          status: order.status
        })) || [])
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

      setStats({
        contactRequests: contactRequestsCount || 0,
        orders: ordersCount || 0,
        pendingOrders: pendingOrdersCount || 0,
        emails: emailsCount || 0
      });

      setRecentActivity(activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Fehler beim Laden der Daten",
        description: "Die Dashboard-Daten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setDataLoading(false);
    }
  };

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
                    Hier finden Sie eine Übersicht Ihrer aktuellen Daten und Aktivitäten.
                  </p>
                </div>

                {dataLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-3 text-muted-foreground">Lade Statistiken...</span>
                  </div>
                ) : (
                  <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Kontaktanfragen</CardTitle>
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-primary">{stats.contactRequests}</div>
                          <p className="text-xs text-muted-foreground">
                            Insgesamt eingegangen
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Bestellungen</CardTitle>
                          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-primary">{stats.orders}</div>
                          <p className="text-xs text-muted-foreground">
                            Gesamtanzahl Aufträge
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Ausstehend</CardTitle>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-primary">{stats.pendingOrders}</div>
                          <p className="text-xs text-muted-foreground">
                            Bestellungen in Bearbeitung
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">E-Mails</CardTitle>
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-primary">{stats.emails}</div>
                          <p className="text-xs text-muted-foreground">
                            Gespeicherte E-Mails
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Activities */}
                    <Card className="rounded-xl shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-primary" />
                          Letzte Aktivitäten
                        </CardTitle>
                        <CardDescription>
                          Übersicht der neuesten Anfragen und Bestellungen
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {recentActivity.length > 0 ? (
                          <div className="space-y-4">
                            {recentActivity.map((activity) => (
                              <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  {activity.type === 'contact' ? (
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                  ) : (
                                    <ShoppingCart className="h-4 w-4 text-green-500" />
                                  )}
                                  <div>
                                    <p className="font-medium">{activity.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {activity.type === 'contact' ? 'Kontaktanfrage' : 'Bestellung'} • {' '}
                                      {new Date(activity.created_at).toLocaleDateString('de-DE', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                      })}
                                    </p>
                                  </div>
                                </div>
                                {activity.status && (
                                  <Badge variant="secondary" className="rounded-lg">
                                    {activity.status === 'pending' ? 'Ausstehend' : activity.status}
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">Keine aktuellen Aktivitäten</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}