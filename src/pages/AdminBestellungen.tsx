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
import { Textarea } from "@/components/ui/textarea";
import { Eye, Search, Filter, Download, ShoppingCart, Package, User, MapPin, Calendar, MessageSquare, Plus, FileText } from "lucide-react";
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

interface OrderNote {
  id: string;
  order_id: string;
  note_text: string;
  created_at: string;
}

export default function AdminBestellungen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: OrderNote[] }>({});
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showViewNotesDialog, setShowViewNotesDialog] = useState(false);
  const [currentOrderForNote, setCurrentOrderForNote] = useState<Order | null>(null);
  const [noteText, setNoteText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    fetchAllNotes();

    // Subscribe to realtime changes for orders
    const ordersChannel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          fetchOrders();
          
          // Send Telegram notification for new order
          supabase.functions.invoke("send-telegram-notification", {
            body: {
              type: "bestellung",
              data: payload.new
            }
          }).catch(error => console.error("Telegram notification error:", error));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders'
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    // Subscribe to realtime changes for order notes
    const notesChannel = supabase
      .channel('order-notes-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'order_notes'
        },
        () => {
          fetchAllNotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(notesChannel);
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

  const fetchAllNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('order_notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group notes by order_id
      const notesByOrderId = (data || []).reduce((acc: { [key: string]: OrderNote[] }, note: OrderNote) => {
        if (!acc[note.order_id]) {
          acc[note.order_id] = [];
        }
        acc[note.order_id].push(note);
        return acc;
      }, {});

      setNotes(notesByOrderId);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (!currentOrderForNote || !noteText.trim()) return;

    try {
      const { error } = await supabase
        .from('order_notes')
        .insert([
          {
            order_id: currentOrderForNote.id,
            note_text: noteText.trim()
          }
        ]);

      if (error) throw error;

      toast({
        title: "Notiz hinzugefügt",
        description: "Die Notiz wurde erfolgreich gespeichert.",
      });

      setNoteText("");
      setShowAddNoteDialog(false);
      fetchAllNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Fehler",
        description: "Die Notiz konnte nicht gespeichert werden.",
        variant: "destructive",
      });
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
      wants_invoice: { label: "Möchte Rechnung", variant: "outline" as const },
      invoice_sent: { label: "Rechnung versendet", variant: "default" as const },
      paid: { label: "Bezahlt", variant: "default" as const },
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

  const handleAddNote = (order: Order) => {
    setCurrentOrderForNote(order);
    setShowAddNoteDialog(true);
  };

  const handleViewNotes = (order: Order) => {
    setCurrentOrderForNote(order);
    setShowViewNotesDialog(true);
  };

  const getLatestNoteTimestamp = (orderId: string) => {
    const orderNotes = notes[orderId];
    if (!orderNotes || orderNotes.length === 0) return null;
    return orderNotes[0].created_at;
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
            <CardTitle className="text-sm font-medium">Bezahlt</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'paid').length}</div>
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
                  <SelectItem value="wants_invoice">Möchte Rechnung</SelectItem>
                  <SelectItem value="invoice_sent">Rechnung versendet</SelectItem>
                  <SelectItem value="paid">Bezahlt</SelectItem>
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
              <TableHead>Telefon</TableHead>
              <TableHead>PLZ</TableHead>
              <TableHead>Produkt</TableHead>
              <TableHead>Menge</TableHead>
              <TableHead>Abladestellen</TableHead>
              <TableHead>Lieferfrist</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notizen</TableHead>
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
                <TableCell className="text-sm">{order.phone}</TableCell>
                <TableCell className="text-sm">{order.postcode}</TableCell>
                <TableCell>{getProductName(order.product)}</TableCell>
                <TableCell>{order.quantity.toLocaleString('de-DE')} L</TableCell>
                <TableCell>{order.delivery_points}</TableCell>
                <TableCell>{getDeliveryTime(order.delivery_time)}</TableCell>
                <TableCell>
                  <Select value={order.status} onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}>
                    <SelectTrigger className="w-[140px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Neu</SelectItem>
                      <SelectItem value="processing">In Bearbeitung</SelectItem>
                      <SelectItem value="wants_invoice">Möchte Rechnung</SelectItem>
                      <SelectItem value="invoice_sent">Rechnung versendet</SelectItem>
                      <SelectItem value="paid">Bezahlt</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {notes[order.id] && notes[order.id].map((note, index) => (
                        <Button
                          key={note.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewNotes(order)}
                          className="h-6 text-xs px-2"
                        >
                          Notiz {index + 1}
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddNote(order)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    {notes[order.id] && notes[order.id].length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(getLatestNoteTimestamp(order.id)!), 'dd.MM.yyyy HH:mm', { locale: de })}
                      </p>
                    )}
                  </div>
                </TableCell>
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
                                <SelectItem value="wants_invoice">Möchte Rechnung</SelectItem>
                                <SelectItem value="invoice_sent">Rechnung versendet</SelectItem>
                                <SelectItem value="paid">Bezahlt</SelectItem>
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

                          {/* Notizen */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <MessageSquare className="h-5 w-5" />
                              Notizen
                            </h3>
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                              {notes[selectedOrder.id] && notes[selectedOrder.id].length > 0 ? (
                                notes[selectedOrder.id].map((note, index) => (
                                  <div key={note.id} className="p-3 border rounded-lg">
                                    <div className="text-sm font-medium mb-1">
                                      Notiz {notes[selectedOrder.id].length - index}
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-2">
                                      {format(new Date(note.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                                    </div>
                                    <div>{note.note_text}</div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-muted-foreground">Keine Notizen vorhanden</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Textarea
                                placeholder="Neue Notiz eingeben..."
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                rows={2}
                              />
                              <Button 
                                onClick={() => {
                                  if (selectedOrder && noteText.trim()) {
                                    setCurrentOrderForNote(selectedOrder);
                                    addNote();
                                  }
                                }} 
                                disabled={!noteText.trim()}
                                size="sm"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
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

      {/* Add Note Dialog */}
      <Dialog open={showAddNoteDialog} onOpenChange={setShowAddNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notiz hinzufügen</DialogTitle>
          </DialogHeader>
          {currentOrderForNote && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Bestellung für {currentOrderForNote.first_name} {currentOrderForNote.last_name}
                </p>
              </div>
              <Textarea
                placeholder="Notiz eingeben..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddNoteDialog(false)}>
                  Abbrechen
                </Button>
                <Button onClick={addNote} disabled={!noteText.trim()}>
                  Notiz hinzufügen
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Notes Dialog */}
      <Dialog open={showViewNotesDialog} onOpenChange={setShowViewNotesDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notizen</DialogTitle>
          </DialogHeader>
          {currentOrderForNote && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Bestellung für {currentOrderForNote.first_name} {currentOrderForNote.last_name}
                </p>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notes[currentOrderForNote.id] && notes[currentOrderForNote.id].length > 0 ? (
                  notes[currentOrderForNote.id].map((note, index) => (
                    <div key={note.id} className="p-3 border rounded-lg">
                      <div className="text-sm font-medium mb-1">
                        Notiz {notes[currentOrderForNote.id].length - index}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {format(new Date(note.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                      </div>
                      <div>{note.note_text}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">Keine Notizen vorhanden</p>
                )}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleAddNote(currentOrderForNote!)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neue Notiz
                </Button>
                <Button onClick={() => setShowViewNotesDialog(false)}>
                  Schließen
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}