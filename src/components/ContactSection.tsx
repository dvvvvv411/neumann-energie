import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  salutation: z.string().min(1, "Bitte wählen Sie eine Anrede"),
  company: z.string().min(1, "Firma ist erforderlich"),
  firstName: z.string().min(1, "Vorname ist erforderlich"),
  lastName: z.string().min(1, "Nachname ist erforderlich"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().min(1, "Telefonnummer ist erforderlich"),
  message: z.string().min(1, "Bitte beschreiben Sie Ihr Anliegen"),
  privacy: z.boolean().refine(val => val === true, "Sie müssen der Datenschutzerklärung zustimmen"),
});

type FormData = z.infer<typeof formSchema>;

export const ContactSection = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salutation: "",
      company: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Ihre Anfrage wurde erfolgreich gesendet!");
    form.reset();
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - 1/3 */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Ihre Anfrage
              </h2>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Lassen Sie sich unverbindlich beraten
              </h3>
              <p className="text-lg leading-relaxed text-foreground">
                Sie wissen noch nicht, ob Heizöl das richtige für Ihr Unternehmen ist? 
                Unsere Experten finden das für Sie heraus. Nehmen Sie jetzt Kontakt zu uns auf.
              </p>
            </div>
          </div>

          {/* Right Column - 2/3 */}
          <div className="lg:col-span-2">
            <div className="bg-card p-12 rounded-2xl shadow-soft">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Anrede */}
                    <FormField
                      control={form.control}
                      name="salutation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium text-lg">Anrede *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="rounded-xl border-input bg-background h-14 text-lg">
                                <SelectValue placeholder="Bitte wählen" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="herr">Herr</SelectItem>
                                <SelectItem value="frau">Frau</SelectItem>
                                <SelectItem value="divers">Divers</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Firma */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-foreground font-medium text-lg">Firma *</FormLabel>
                           <FormControl>
                             <Input 
                               {...field} 
                               className="rounded-xl border-input bg-background h-14 text-lg px-4"
                               placeholder="Ihr Firmenname"
                             />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Vorname */}
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-foreground font-medium text-lg">Vorname *</FormLabel>
                           <FormControl>
                             <Input 
                               {...field} 
                               className="rounded-xl border-input bg-background h-14 text-lg px-4"
                               placeholder="Ihr Vorname"
                             />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Nachname */}
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-foreground font-medium text-lg">Nachname *</FormLabel>
                           <FormControl>
                             <Input 
                               {...field} 
                               className="rounded-xl border-input bg-background h-14 text-lg px-4"
                               placeholder="Ihr Nachname"
                             />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-foreground font-medium text-lg">E-Mail *</FormLabel>
                           <FormControl>
                             <Input 
                               {...field} 
                               type="email"
                               className="rounded-xl border-input bg-background h-14 text-lg px-4"
                               placeholder="ihre.email@beispiel.de"
                             />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Telefonnummer */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-foreground font-medium text-lg">Telefonnummer *</FormLabel>
                           <FormControl>
                             <Input 
                               {...field} 
                               type="tel"
                               className="rounded-xl border-input bg-background h-14 text-lg px-4"
                               placeholder="+49 123 456789"
                             />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Ihr Anliegen */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-foreground font-medium text-lg">Ihr Anliegen *</FormLabel>
                       <FormControl>
                         <Textarea 
                           {...field} 
                           className="rounded-xl border-input bg-background min-h-[150px] resize-none text-lg px-4 py-4"
                           placeholder="Beschreiben Sie bitte Ihr Anliegen..."
                         />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Datenschutzerklärung */}
                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded-md"
                          />
                        </FormControl>
                         <div className="space-y-1 leading-none">
                           <FormLabel className="text-lg text-foreground font-normal cursor-pointer">
                             Ich habe die Datenschutzerklärung zur Kenntnis genommen und stimme zu. *
                           </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                   <div className="pt-6">
                     <Button 
                       type="submit" 
                       variant="default"
                       size="lg"
                       className="w-full px-12 py-4 rounded-xl font-semibold text-lg h-14 bg-primary text-primary-foreground hover:bg-primary/90"
                     >
                       Anfrage absenden
                     </Button>
                   </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};