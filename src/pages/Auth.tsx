import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  password: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen lang sein"),
});

export default function Auth() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect if already authenticated
  if (user) {
    navigate("/admin");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = authSchema.parse(formData);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: error.message === "Invalid login credentials" 
            ? "Ungültige Anmeldedaten. Bitte überprüfen Sie Ihre E-Mail und Ihr Passwort."
            : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erfolgreich angemeldet",
          description: "Sie werden weitergeleitet...",
        });
        navigate("/admin");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Eingabefehler",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = authSchema.parse(formData);
      const redirectUrl = `${window.location.origin}/admin`;
      
      const { error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        toast({
          title: "Registrierung fehlgeschlagen",
          description: error.message === "User already registered" 
            ? "Ein Konto mit dieser E-Mail-Adresse existiert bereits."
            : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registrierung erfolgreich",
          description: "Bitte überprüfen Sie Ihre E-Mail zur Bestätigung.",
        });
        navigate("/admin");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Eingabefehler",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* Left Hero Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <img 
                src="/lovable-uploads/neumannlogo.png.png" 
                alt="Neumann Energie" 
                className="h-20 w-auto mx-auto lg:mx-0 mb-8"
              />
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                Willkommen bei
                <span className="text-primary block">Neumann Energie</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Melden Sie sich an, um Zugang zu Ihrem persönlichen Admin-Bereich zu erhalten.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-primary mb-2">Heizöl-Service</h3>
                  <p className="text-sm text-muted-foreground">Professionelle Belieferung</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-primary mb-2">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Immer für Sie da</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Auth Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm shadow-xl rounded-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Anmeldung</CardTitle>
                <CardDescription>
                  Melden Sie sich an oder erstellen Sie ein neues Konto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 rounded-lg">
                    <TabsTrigger value="signin" className="rounded-lg">Anmelden</TabsTrigger>
                    <TabsTrigger value="signup" className="rounded-lg">Registrieren</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">E-Mail</Label>
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="ihre.email@beispiel.de"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Passwort</Label>
                        <Input
                          id="signin-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full rounded-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Anmeldung läuft..." : "Anmelden"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">E-Mail</Label>
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="ihre.email@beispiel.de"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Passwort</Label>
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full rounded-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Registrierung läuft..." : "Registrieren"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}