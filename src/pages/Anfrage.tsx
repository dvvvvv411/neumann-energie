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
import { ArrowLeft, ArrowRight, Check, MapPin, Package, MessageSquare, Truck, User, Mail, Phone, MapPin as AddressIcon, Shield } from "lucide-react";
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
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Step 1: Anliegen - Modern Card Layout */}
          {currentStep === 1 && (
            <Form {...step1Form}>
              <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-8">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                  
                  {/* Ihr Standort Card */}
                  <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="py-8">
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
                    <CardContent className="px-8 pb-8">
                      <FormField
                        control={step1Form.control}
                        name="postcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Postleitzahl *</FormLabel>
                            <FormControl>
                               <Input 
                                 placeholder="12345" 
                                 {...field}
                                 className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
                               />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Deutschlandweite Lieferung Badge */}
                      <div className="mt-4 flex items-center space-x-2 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Deutschlandweite Lieferung</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Produktauswahl Card */}
                  <Card className="lg:col-span-2 group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="py-8">
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
                    <CardContent className="px-8 pb-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <FormField
                          control={step1Form.control}
                          name="product"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-medium">Produkt *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                      <SelectTrigger className="h-14 text-lg">
                        <SelectValue placeholder="Produkt wählen" className="placeholder:text-base placeholder:text-muted-foreground/70" />
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
                              <FormLabel className="text-lg font-medium">Liefermenge (Liter) *</FormLabel>
                              <FormControl>
                                 <Input 
                                   placeholder="1000" 
                                   type="number" 
                                   {...field}
                                   className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
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
                              <FormLabel className="text-lg font-medium">Abladestellen *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                      <SelectTrigger className="h-14 text-lg">
                        <SelectValue placeholder="Anzahl wählen" className="placeholder:text-base placeholder:text-muted-foreground/70" />
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
                              <FormLabel className="text-lg font-medium">Lieferfrist *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                      <SelectTrigger className="h-14 text-lg">
                        <SelectValue placeholder="Lieferfrist wählen" className="placeholder:text-base placeholder:text-muted-foreground/70" />
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
                  <CardHeader className="py-8">
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
                  <CardContent className="px-8 pb-8">
                    <FormField
                      control={step1Form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium">Nachricht (optional)</FormLabel>
                          <FormControl>
                             <Textarea
                               placeholder="Zusätzliche Informationen, besondere Lieferwünsche, Fragen..."
                               className="min-h-[140px] text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary resize-none"
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

          {/* Step 2: Persönliche Angaben - Multiple Cards Layout */}
          {currentStep === 2 && (
            <Form {...step2Form}>
              <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-8">
                
                {/* Persönliche Daten Card */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="py-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Persönliche Daten</CardTitle>
                        <p className="text-muted-foreground">Grundlegende Informationen zu Ihrer Person</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={step2Form.control}
                        name="salutation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Anrede *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                        <SelectTrigger className="h-14 text-lg">
                          <SelectValue placeholder="Anrede wählen" className="placeholder:text-base placeholder:text-muted-foreground/70" />
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
                            <FormLabel className="text-lg font-medium">Firma (optional)</FormLabel>
                            <FormControl>
                               <Input 
                                 placeholder="Firmenname" 
                                 {...field}
                                 className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
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
                            <FormLabel className="text-lg font-medium">Vorname *</FormLabel>
                            <FormControl>
                               <Input 
                                 placeholder="Max" 
                                 {...field}
                                 className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
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
                            <FormLabel className="text-lg font-medium">Nachname *</FormLabel>
                            <FormControl>
                               <Input 
                                 placeholder="Mustermann" 
                                 {...field}
                                 className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
                               />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Kontaktdaten Card */} 
                <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="py-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Kontaktdaten</CardTitle>
                        <p className="text-muted-foreground">Wie können wir Sie erreichen?</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={step2Form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">E-Mail *</FormLabel>
                            <FormControl>
                               <Input 
                                 placeholder="max@example.com" 
                                 type="email" 
                                 {...field}
                                 className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
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
                            <FormLabel className="text-lg font-medium">Telefonnummer *</FormLabel>
                            <FormControl>
                               <Input 
                                 placeholder="+49 123 456789" 
                                 {...field}
                                 className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
                               />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Adressdaten Card */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="py-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <AddressIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Adressdaten</CardTitle>
                        <p className="text-muted-foreground">Ihre Lieferadresse</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={step2Form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Straße, Hausnummer *</FormLabel>
                            <FormControl>
                               <Input 
                                 placeholder="Musterstraße 123" 
                                 {...field}
                                 className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
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
                            <FormLabel className="text-lg font-medium">PLZ, Ort *</FormLabel>
                            <FormControl>
                               <Input 
                                 placeholder="12345 Musterstadt" 
                                 {...field}
                                 className="h-14 text-lg placeholder:text-base placeholder:text-muted-foreground/70 focus:ring-primary/20 focus:border-primary"
                               />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Datenschutz Card */}
                <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="py-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Datenschutz</CardTitle>
                        <p className="text-muted-foreground">Ihre Zustimmung zur Datenverarbeitung</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <FormField
                      control={step2Form.control}
                      name="privacy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-4 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-2 w-5 h-5"
                            />
                          </FormControl>
                          <div className="space-y-2 leading-relaxed">
                            <FormLabel className="text-lg font-medium">
                              Ich habe die Datenschutzerklärung gelesen und akzeptiere diese. *
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="px-10 h-14 text-lg"
                  >
                    <ArrowLeft className="mr-3 h-5 w-5" /> Zurück
                  </Button>
                  <Button 
                    type="submit" 
                    size="lg"
                    className="px-16 h-16 text-xl font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-200"
                  >
                    Zur Zusammenfassung <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </div>
              </form>
            </Form>
          )}

            {/* Step 3: Zusammenfassung - Enhanced Layout */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="py-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-2xl font-bold">Ihr Anliegen</CardTitle>
                        </div>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setCurrentStep(1)}
                          className="h-12 px-6 text-base"
                        >
                          Bearbeiten
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-6">
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">Postleitzahl</span>
                        <span className="text-lg font-semibold">{formData.postcode}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">Produkt</span>
                        <span className="text-lg font-semibold">{formData.product === 'heizoel-din' ? 'Heizöl DIN schwefelarm' : 'Sparheizöl schwefelarm'}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">Liefermenge</span>
                        <span className="text-lg font-semibold">{formData.quantity} Liter</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">Abladestellen</span>
                        <span className="text-lg font-semibold">{formData.deliveryPoints}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">Lieferfrist</span>
                        <span className="text-lg font-semibold">{formData.deliveryTime === 'express' ? '48h Express (Aufpreis)' : '5 - 7 Werktage'}</span>
                      </div>
                      {formData.message && (
                        <div className="py-3">
                          <span className="text-lg font-medium text-muted-foreground block mb-2">Nachricht</span>
                          <p className="text-base bg-muted/30 p-4 rounded-lg">{formData.message}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="py-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-2xl font-bold">Persönliche Angaben</CardTitle>
                        </div>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setCurrentStep(2)}
                          className="h-12 px-6 text-base"
                        >
                          Bearbeiten
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-6">
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">Anrede</span>
                        <span className="text-lg font-semibold">{formData.salutation === 'herr' ? 'Herr' : formData.salutation === 'frau' ? 'Frau' : 'Divers'}</span>
                      </div>
                      {formData.company && (
                        <div className="flex justify-between py-3 border-b border-border/50">
                          <span className="text-lg font-medium text-muted-foreground">Firma</span>
                          <span className="text-lg font-semibold">{formData.company}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">Name</span>
                        <span className="text-lg font-semibold">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">E-Mail</span>
                        <span className="text-lg font-semibold">{formData.email}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border/50">
                        <span className="text-lg font-medium text-muted-foreground">Telefon</span>
                        <span className="text-lg font-semibold">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-lg font-medium text-muted-foreground">Adresse</span>
                        <span className="text-lg font-semibold text-right">{formData.street}, {formData.cityPostcode}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              {/* Final Action */}
              <div className="text-center pt-12">
                <Button 
                  onClick={handleFinalSubmit} 
                  size="lg"
                  className="px-20 h-20 text-2xl font-bold shadow-2xl hover:shadow-primary/30 transition-all duration-300 bg-gradient-primary hover:scale-105"
                >
                  <Check className="mr-4 h-8 w-8" />
                  Anfrage jetzt absenden
                  <ArrowRight className="ml-4 h-8 w-8" />
                </Button>
                <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
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