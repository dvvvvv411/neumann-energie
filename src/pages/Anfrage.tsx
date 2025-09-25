import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, MapPin, Package, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const step1Schema = z.object({
  postcode: z.string().min(5, "Postleitzahl muss mindestens 5 Zeichen haben").max(5, "Postleitzahl darf maximal 5 Zeichen haben"),
  product: z.string().min(1, "Bitte wählen Sie ein Produkt"),
  quantity: z.string().min(1, "Bitte geben Sie die Liefermenge an"),
  deliveryPoints: z.string().min(1, "Bitte wählen Sie die Anzahl Abladestellen"),
  deliveryTime: z.string().min(1, "Bitte wählen Sie eine Lieferfrist"),
  message: z.string().optional(),
});

const step2Schema = z.object({
  salutation: z.string().min(1, "Bitte wählen Sie eine Anrede"),
  company: z.string().optional(),
  firstName: z.string().min(1, "Vorname ist erforderlich"),
  lastName: z.string().min(1, "Nachname ist erforderlich"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().min(1, "Telefonnummer ist erforderlich"),
  street: z.string().min(1, "Straße und Hausnummer sind erforderlich"),
  cityPostcode: z.string().min(1, "PLZ und Ort sind erforderlich"),
  privacy: z.boolean().refine(val => val === true, "Datenschutzerklärung muss akzeptiert werden"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type FormData = Step1Data & Step2Data;

export default function Anfrage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData as Step1Data,
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData as Step2Data,
  });

  const handleStep1Submit = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: Step2Data) => {
    const completeData = { ...formData, ...data };
    setFormData(completeData);
    setCurrentStep(3);
  };

  const handleFinalSubmit = () => {
    console.log("Form submitted:", formData);
    toast({
      title: "Anfrage gesendet",
      description: "Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden.",
    });
  };

  const goToStep = (step: number) => {
    if (step < currentStep || currentStep === 3) {
      setCurrentStep(step);
    }
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Modern Progress Bar */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-0 w-full h-0.5 bg-muted"></div>
              <div 
                className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
              
              {/* Steps */}
              <div className="relative flex justify-between">
                {[
                  { step: 1, title: "Anliegen", subtitle: "Produktauswahl" },
                  { step: 2, title: "Persönliche Angaben", subtitle: "Kontaktdaten" },
                  { step: 3, title: "Zusammenfassung", subtitle: "Bestätigung" }
                ].map(({ step, title, subtitle }) => (
                  <div 
                    key={step}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => goToStep(step)}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                      border-2 bg-background transition-all duration-200
                      ${step < currentStep 
                        ? 'border-primary bg-primary text-primary-foreground shadow-primary/20 shadow-lg' 
                        : step === currentStep
                          ? 'border-primary text-primary border-2 shadow-primary/10 shadow-md scale-110'
                          : 'border-muted-foreground/30 text-muted-foreground group-hover:border-primary/50'
                      }
                    `}>
                      {step < currentStep ? <Check size={14} /> : step}
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-medium ${
                        step <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {title}
                      </div>
                      <div className={`text-xs ${
                        step <= currentStep ? 'text-muted-foreground' : 'text-muted-foreground/60'
                      }`}>
                        {subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Step 1: Anliegen - Modern Card Layout */}
          {currentStep === 1 && (
            <Form {...step1Form}>
              <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-8">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                  
                  {/* Ihr Standort Card */}
                  <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Ihr Standort</CardTitle>
                          <p className="text-sm text-muted-foreground">Für ein individuelles Angebot geben Sie bitte Ihre Postleitzahl ein.</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <FormField
                        control={step1Form.control}
                        name="postcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Postleitzahl *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="12345" 
                                {...field}
                                className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Produktauswahl Card */}
                  <Card className="lg:col-span-2 group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Produktauswahl</CardTitle>
                          <p className="text-sm text-muted-foreground">Wählen Sie Ihr gewünschtes Produkt und die Lieferdetails.</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={step1Form.control}
                          name="product"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Produkt *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Produkt wählen" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="heizoel-din">Heizöl DIN schwefelarm</SelectItem>
                                  <SelectItem value="sparheizoel">Sparheizöl schwefelarm</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={step1Form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Liefermenge (Liter) *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="1000" 
                                  type="number" 
                                  {...field}
                                  className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={step1Form.control}
                          name="deliveryPoints"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Abladestellen *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Anzahl wählen" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={step1Form.control}
                          name="deliveryTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Lieferfrist *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Lieferfrist wählen" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="express">48h Express (Aufpreis)</SelectItem>
                                  <SelectItem value="standard">5 - 7 Werktage</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Zusätzliche Informationen Card */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Zusätzliche Informationen</CardTitle>
                        <p className="text-sm text-muted-foreground">Teilen Sie uns weitere wichtige Details mit.</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <FormField
                      control={step1Form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Nachricht (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Zusätzliche Informationen, besondere Lieferwünsche, Fragen..."
                              className="min-h-[120px] text-base focus:ring-primary/20 focus:border-primary resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Action Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="px-12 h-14 text-lg font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-200"
                  >
                    Weiter zu den Kontaktdaten <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Step 2: Persönliche Angaben - Modern Layout */}
          {currentStep === 2 && (
            <Form {...step2Form}>
              <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-8">
                
                {/* Personal Information Card */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold">Persönliche Angaben</CardTitle>
                    <p className="text-muted-foreground">Damit wir Ihnen ein individuelles Angebot erstellen können.</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={step2Form.control}
                        name="salutation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Anrede *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 text-base">
                                  <SelectValue placeholder="Anrede wählen" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="herr">Herr</SelectItem>
                                <SelectItem value="frau">Frau</SelectItem>
                                <SelectItem value="divers">Divers</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={step2Form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Firma (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Firmenname" 
                                {...field}
                                className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={step2Form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Vorname *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Max" 
                                {...field}
                                className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={step2Form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Nachname *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Mustermann" 
                                {...field}
                                className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={step2Form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">E-Mail *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="max@example.com" 
                                type="email" 
                                {...field}
                                className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={step2Form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Telefonnummer *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+49 123 456789" 
                                {...field}
                                className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={step2Form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Straße, Hausnummer *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Musterstraße 123" 
                                {...field}
                                className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={step2Form.control}
                        name="cityPostcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">PLZ, Ort *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="12345 Musterstadt" 
                                {...field}
                                className="h-12 text-base focus:ring-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <FormField
                        control={step2Form.control}
                        name="privacy"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-relaxed">
                              <FormLabel className="text-base">
                                Ich habe die Datenschutzerklärung gelesen und akzeptiere diese. *
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="px-8 h-12 text-base"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
                  </Button>
                  <Button 
                    type="submit" 
                    size="lg"
                    className="px-12 h-14 text-lg font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-200"
                  >
                    Zur Zusammenfassung <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </Form>
          )}

            {/* Step 3: Zusammenfassung */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        Ihr Anliegen
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(1)}
                        >
                          Bearbeiten
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div><strong>Postleitzahl:</strong> {formData.postcode}</div>
                      <div><strong>Produkt:</strong> {formData.product === 'heizoel-din' ? 'Heizöl DIN schwefelarm' : 'Sparheizöl schwefelarm'}</div>
                      <div><strong>Liefermenge:</strong> {formData.quantity} Liter</div>
                      <div><strong>Abladestellen:</strong> {formData.deliveryPoints}</div>
                      <div><strong>Lieferfrist:</strong> {formData.deliveryTime === 'express' ? '48h Express (Aufpreis)' : '5 - 7 Werktage'}</div>
                      {formData.message && <div><strong>Nachricht:</strong> {formData.message}</div>}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        Persönliche Angaben
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(2)}
                        >
                          Bearbeiten
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div><strong>Anrede:</strong> {formData.salutation === 'herr' ? 'Herr' : formData.salutation === 'frau' ? 'Frau' : 'Divers'}</div>
                      {formData.company && <div><strong>Firma:</strong> {formData.company}</div>}
                      <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                      <div><strong>E-Mail:</strong> {formData.email}</div>
                      <div><strong>Telefon:</strong> {formData.phone}</div>
                      <div><strong>Adresse:</strong> {formData.street}, {formData.cityPostcode}</div>
                    </CardContent>
                  </Card>
                </div>

              {/* Final Action */}
              <div className="text-center pt-8">
                <Button 
                  onClick={handleFinalSubmit} 
                  size="lg"
                  className="px-16 h-16 text-xl font-bold shadow-xl hover:shadow-primary/30 transition-all duration-300 bg-gradient-primary hover:scale-105"
                >
                  <Check className="mr-3 h-6 w-6" />
                  Anfrage jetzt absenden
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Sie erhalten eine Bestätigung per E-Mail und werden innerhalb von 24 Stunden kontaktiert.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}