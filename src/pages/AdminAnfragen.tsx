import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Calendar, Mail, Phone, Building, User, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface ContactRequest {
  id: string;
  salutation: string;
  company: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export default function AdminAnfragen() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchContactRequests();
      setupRealtimeSubscription();
    }
  }, [user]);

  const fetchContactRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact requests:', error);
        toast({
          title: "Fehler beim Laden",
          description: "Kontaktanfragen konnten nicht geladen werden.",
          variant: "destructive",
        });
      } else {
        setContactRequests(data || []);
      }
    } catch (error) {
      console.error('Error fetching contact requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('contact_requests_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_requests'
        },
        (payload) => {
          setContactRequests(prev => [payload.new as ContactRequest, ...prev]);
          toast({
            title: "Neue Anfrage",
            description: `Neue Anfrage von ${payload.new.first_name} ${payload.new.last_name}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getSalutationLabel = (salutation: string) => {
    switch (salutation) {
      case 'herr': return 'Herr';
      case 'frau': return 'Frau';
      case 'divers': return 'Divers';
      default: return salutation;
    }
  };

  const truncateMessage = (message: string, maxLength = 50) => {
    return message.length > maxLength 
      ? message.substring(0, maxLength) + '...' 
      : message;
  };

  const handleShowDetails = (request: ContactRequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade Anfragen...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <MessageSquare className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kontaktanfragen</h1>
          <p className="text-muted-foreground">
            Übersicht aller eingegangenen Anfragen von der Website
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtanfragen</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{contactRequests.length}</div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heute</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {contactRequests.filter(req => 
                new Date(req.created_at).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diese Woche</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {contactRequests.filter(req => {
                const reqDate = new Date(req.created_at);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return reqDate >= weekAgo;
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Alle Anfragen</CardTitle>
          <CardDescription>
            Chronologische Auflistung aller Kontaktanfragen
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contactRequests.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Noch keine Anfragen vorhanden</p>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>Firma</TableHead>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Anliegen</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {getSalutationLabel(request.salutation)} {request.first_name} {request.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {getSalutationLabel(request.salutation)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{request.company}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={`mailto:${request.email}`}
                            className="text-foreground hover:underline"
                          >
                            {request.email}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={`tel:${request.phone}`}
                            className="text-foreground hover:underline"
                          >
                            {request.phone}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="text-sm" title={request.message}>
                            {truncateMessage(request.message)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">
                            {formatDistanceToNow(new Date(request.created_at), { 
                              addSuffix: true, 
                              locale: de 
                            })}
                          </p>
                          <p className="text-muted-foreground">
                            {new Date(request.created_at).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShowDetails(request)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kontaktanfrage Details</DialogTitle>
            <DialogDescription>
              Vollständige Ansicht der Kontaktanfrage
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Kontaktdaten
                  </h3>
                  <div className="space-y-2">
                    <p><span className="text-muted-foreground">Name:</span> {getSalutationLabel(selectedRequest.salutation)} {selectedRequest.first_name} {selectedRequest.last_name}</p>
                    <p><span className="text-muted-foreground">E-Mail:</span> 
                      <a 
                        href={`mailto:${selectedRequest.email}`}
                        className="text-foreground hover:underline ml-1"
                      >
                        {selectedRequest.email}
                      </a>
                    </p>
                    <p><span className="text-muted-foreground">Telefon:</span> 
                      <a 
                        href={`tel:${selectedRequest.phone}`}
                        className="text-foreground hover:underline ml-1"
                      >
                        {selectedRequest.phone}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Firma & Metadaten
                  </h3>
                  <div className="space-y-2">
                    <p><span className="text-muted-foreground">Firma:</span> {selectedRequest.company}</p>
                    <p><span className="text-muted-foreground">Eingegangen:</span> {new Date(selectedRequest.created_at).toLocaleString('de-DE')}</p>
                    <p><span className="text-muted-foreground">ID:</span> <code className="text-xs bg-muted px-1 py-0.5 rounded">{selectedRequest.id}</code></p>
                  </div>
                </div>
              </div>
              
              {/* Message */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Nachricht
                </h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{selectedRequest.message}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}