import { useState, useEffect } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search, Filter, Download, ShoppingCart, Package, User, MapPin, Calendar, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  postcode: string;
  product: string;
  quantity: number;
  delivery_points: number;
  delivery_time: string;
  message: string | null;
  salutation: string;
  company: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  city_postcode: string;
  privacy_accepted: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function AdminBestellungen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Fehler beim Laden",
        description: "Die Bestellungen konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Status aktualisiert",
        description: "Der Bestellstatus wurde erfolgreich geändert.",
      });

      fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Fehler",
        description: "Der Status konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Neu", variant: "secondary" as const },
      processing: { label: "In Bearbeitung", variant: "default" as const },
      shipped: { label: "Versendet", variant: "outline" as const },
      delivered: { label: "Geliefert", variant: "default" as const },
      cancelled: { label: "Storniert", variant: "destructive" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "secondary" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getProductName = (product: string) => {
    return product === "heizoel-din" ? "Heizöl DIN schwefelarm" : "Sparheizöl schwefelarm";
  };

  const getDeliveryTime = (deliveryTime: string) => {
    return deliveryTime === "express" ? "48h Express" : "5-7 Werktage";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bestellungen</h1>
          <p className="text-muted-foreground">Verwalten Sie alle eingehenden Bestellungen</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamt</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Neue</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Bearbeitung</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'processing').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Geliefert</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'delivered').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Suchen nach Name, E-Mail oder Produkt..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="pending">Neu</SelectItem>
                  <SelectItem value="processing">In Bearbeitung</SelectItem>
                  <SelectItem value="shipped">Versendet</SelectItem>
                  <SelectItem value="delivered">Geliefert</SelectItem>
                  <SelectItem value="cancelled">Storniert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum</TableHead>
              <TableHead>Kontakt</TableHead>
              <TableHead>Produkt</TableHead>
              <TableHead>Menge</TableHead>
              <TableHead>Lieferfrist</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {format(new Date(order.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{order.first_name} {order.last_name}</div>
                    <div className="text-sm text-muted-foreground">{order.email}</div>
                    {order.company && (
                      <div className="text-sm text-muted-foreground">{order.company}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getProductName(order.product)}</TableCell>
                <TableCell>{order.quantity.toLocaleString('de-DE')} L</TableCell>
                <TableCell>{getDeliveryTime(order.delivery_time)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Bestellung #{order.id.slice(-8)}</DialogTitle>
                      </DialogHeader>
                      {selectedOrder && (
                        <div className="space-y-6">
                          {/* Status Management */}
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <span className="font-medium">Status: </span>
                              {getStatusBadge(selectedOrder.status)}
                            </div>
                            <Select 
                              value={selectedOrder.status} 
                              onValueChange={(newStatus) => updateOrderStatus(selectedOrder.id, newStatus)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Neu</SelectItem>
                                <SelectItem value="processing">In Bearbeitung</SelectItem>
                                <SelectItem value="shipped">Versendet</SelectItem>
                                <SelectItem value="delivered">Geliefert</SelectItem>
                                <SelectItem value="cancelled">Storniert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Product Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Package className="h-5 w-5" />
                              Produktinformationen
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Produkt</span>
                                <div>{getProductName(selectedOrder.product)}</div>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Menge</span>
                                <div>{selectedOrder.quantity.toLocaleString('de-DE')} Liter</div>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Abladestellen</span>
                                <div>{selectedOrder.delivery_points}</div>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Lieferfrist</span>
                                <div>{getDeliveryTime(selectedOrder.delivery_time)}</div>
                              </div>
                            </div>
                          </div>

                          {/* Customer Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <User className="h-5 w-5" />
                              Kundendaten
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Name</span>
                                <div>{selectedOrder.salutation} {selectedOrder.first_name} {selectedOrder.last_name}</div>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">E-Mail</span>
                                <div>{selectedOrder.email}</div>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Telefon</span>
                                <div>{selectedOrder.phone}</div>
                              </div>
                              {selectedOrder.company && (
                                <div>
                                  <span className="text-sm font-medium text-muted-foreground">Firma</span>
                                  <div>{selectedOrder.company}</div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Address Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <MapPin className="h-5 w-5" />
                              Lieferadresse
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Straße</span>
                                <div>{selectedOrder.street}</div>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">PLZ & Ort</span>
                                <div>{selectedOrder.city_postcode}</div>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Postleitzahl</span>
                                <div>{selectedOrder.postcode}</div>
                              </div>
                            </div>
                          </div>

                          {/* Message */}
                          {selectedOrder.message && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Nachricht
                              </h3>
                              <div className="p-3 bg-muted rounded-lg">
                                {selectedOrder.message}
                              </div>
                            </div>
                          )}

                          {/* Timestamps */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Calendar className="h-5 w-5" />
                              Zeitstempel
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Erstellt am</span>
                                <div>{format(new Date(selectedOrder.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}</div>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Zuletzt geändert</span>
                                <div>{format(new Date(selectedOrder.updated_at), 'dd.MM.yyyy HH:mm', { locale: de })}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Keine Bestellungen gefunden.
          </div>
        )}
      </Card>
    </div>
  );
}