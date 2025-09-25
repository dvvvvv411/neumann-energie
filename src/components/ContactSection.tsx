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
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Ensure we're using an anonymous session for the contact form
      await supabase.auth.signOut();
      
      const { error } = await supabase
        .from('contact_requests')
        .insert({
          salutation: data.salutation,
          company: data.company,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          message: data.message,
        });

      if (error) {
        console.error('Error submitting contact request:', error);
        toast.error("Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.");
      } else {
        toast.success("Ihre Anfrage wurde erfolgreich gesendet!");
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting contact request:', error);
      toast.error("Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="anfrage" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Left Column - 1/4 */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Ihre Anfrage
              </h2>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Lassen Sie sich unverbindlich beraten
              </h3>
              <p className="text-base leading-relaxed text-foreground">
                Sie wissen noch nicht, ob Heizöl das richtige für Ihr Unternehmen ist? 
                Unsere Experten finden das für Sie heraus. Nehmen Sie jetzt Kontakt zu uns auf.
              </p>
            </div>
          </div>

          {/* Right Column - 3/4 */}
          <div className="lg:col-span-3">
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
                              <SelectTrigger className="rounded-xl border-input bg-background h-16 text-lg">
                                <SelectValue placeholder="Bitte wählen" className="text-lg" />
                              </SelectTrigger>
                              <SelectContent className="bg-background border border-border rounded-xl shadow-lg z-50 min-w-[200px]">
                                <SelectItem value="herr" className="text-lg py-3 px-4 pl-8 focus:bg-accent focus:text-accent-foreground">Herr</SelectItem>
                                <SelectItem value="frau" className="text-lg py-3 px-4 pl-8 focus:bg-accent focus:text-accent-foreground">Frau</SelectItem>
                                <SelectItem value="divers" className="text-lg py-3 px-4 pl-8 focus:bg-accent focus:text-accent-foreground">Divers</SelectItem>
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
                               className="rounded-xl border-input bg-background h-16 text-lg px-4 placeholder:text-lg"
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
                               className="rounded-xl border-input bg-background h-16 text-lg px-4 placeholder:text-lg"
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
                               className="rounded-xl border-input bg-background h-16 text-lg px-4 placeholder:text-lg"
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
                               className="rounded-xl border-input bg-background h-16 text-lg px-4 placeholder:text-lg"
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
                               className="rounded-xl border-input bg-background h-16 text-lg px-4 placeholder:text-lg"
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
                           className="rounded-xl border-input bg-background min-h-[160px] resize-none text-lg px-4 py-4 placeholder:text-lg"
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
                     <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                       <FormControl>
                         <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                           className="rounded-md w-5 h-5"
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
                        variant="modern"
                        size="lg"
                        className="w-full px-12 py-4 rounded-xl font-bold text-xl h-16 gap-4 group"
                        style={{ color: '#0c2a3e' }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            Anfrage absenden
                            <ArrowUpRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-45" />
                          </>
                        )}
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