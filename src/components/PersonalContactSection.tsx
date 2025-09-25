import { Mail, Phone, Headset, ArrowUpRight } from "lucide-react";
// Using uploaded image directly

export function PersonalContactSection() {
  return (
    <section id="kontakt" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Kontakt
              </h2>
              <p className="text-6xl font-bold text-foreground mb-6">
                Sie möchten persönlich beraten werden?
              </p>
              <p className="text-2xl text-foreground">
                Unser Team hilft Ihnen gerne weiter.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <a 
                  href="mailto:info@neumann-energie.de"
                  className="group flex items-center gap-2 text-2xl text-foreground hover:text-primary transition-colors font-medium"
                >
                  info@neumann-energie.de
                  <ArrowUpRight className="w-6 h-6 text-primary group-hover:rotate-45 transition-transform duration-300" />
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <a 
                  href="tel:0228512710"
                  className="group flex items-center gap-2 text-2xl text-foreground hover:text-primary transition-colors font-medium"
                >
                  0228 512-710
                  <ArrowUpRight className="w-6 h-6 text-primary group-hover:rotate-45 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Profile */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <img
                src="/lovable-uploads/3.webp.png"
                alt="Martin Bois - Vertrieb Heizöl"
                className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-background"
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">
                Martin Bois
              </h3>
              <div className="flex items-center justify-center gap-2">
                <Headset className="w-5 h-5 text-primary" />
                <p className="text-lg text-muted-foreground font-medium">
                  Vertrieb Heizöl
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}