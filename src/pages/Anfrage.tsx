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
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-8">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`flex items-center cursor-pointer ${
                    step <= currentStep ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => goToStep(step)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                    step < currentStep 
                      ? 'bg-primary text-primary-foreground border-primary'
                      : step === currentStep
                        ? 'border-primary text-primary bg-background'
                        : 'border-border text-muted-foreground'
                  }`}>
                    {step < currentStep ? <Check size={16} /> : step}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {step === 1 && "Anliegen"}
                    {step === 2 && "Persönliche Angaben"}
                    {step === 3 && "Zusammenfassung"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="max-w-4xl mx-auto shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {currentStep === 1 && "Ihr Anliegen"}
              {currentStep === 2 && "Persönliche Angaben"}
              {currentStep === 3 && "Zusammenfassung"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Step 1: Anliegen */}
            {currentStep === 1 && (
              <Form {...step1Form}>
                <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={step1Form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postleitzahl *</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step1Form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Produkt *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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
                          <FormLabel>Liefermenge (Liter) *</FormLabel>
                          <FormControl>
                            <Input placeholder="1000" type="number" {...field} />
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
                          <FormLabel>Abladestellen *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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
                        <FormItem className="md:col-span-2">
                          <FormLabel>Lieferfrist *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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

                  <FormField
                    control={step1Form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nachricht (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Zusätzliche Informationen..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" className="px-8">
                      Weiter <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {/* Step 2: Persönliche Angaben */}
            {currentStep === 2 && (
              <Form {...step2Form}>
                <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={step2Form.control}
                      name="salutation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anrede *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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
                          <FormLabel>Firma (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Firmenname" {...field} />
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
                          <FormLabel>Vorname *</FormLabel>
                          <FormControl>
                            <Input placeholder="Max" {...field} />
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
                          <FormLabel>Nachname *</FormLabel>
                          <FormControl>
                            <Input placeholder="Mustermann" {...field} />
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
                          <FormLabel>E-Mail *</FormLabel>
                          <FormControl>
                            <Input placeholder="max@example.com" type="email" {...field} />
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
                          <FormLabel>Telefonnummer *</FormLabel>
                          <FormControl>
                            <Input placeholder="+49 123 456789" {...field} />
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
                          <FormLabel>Straße, Hausnummer *</FormLabel>
                          <FormControl>
                            <Input placeholder="Musterstraße 123" {...field} />
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
                          <FormLabel>PLZ, Ort *</FormLabel>
                          <FormControl>
                            <Input placeholder="12345 Musterstadt" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={step2Form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Ich habe die Datenschutzerklärung gelesen und akzeptiere diese. *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
                    </Button>
                    <Button type="submit" className="px-8">
                      Weiter <ArrowRight className="ml-2 h-4 w-4" />
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

                <div className="flex justify-center">
                  <Button onClick={handleFinalSubmit} className="px-12 py-3 text-lg">
                    Anfrage absenden
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}