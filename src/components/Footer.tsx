import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import knauberLogo from "@/assets/knauber-logo.svg";

export const Footer = () => {
  const legalLinks = [
    { name: "Widerrufsrecht", path: "/widerrufsrecht" },
    { name: "Impressum", path: "/impressum" },
    { name: "Datenschutz", path: "/datenschutz" },
    { name: "Barrierefreiheitserklärung", path: "/barrierefreiheit" },
    { name: "Cookies", path: "/cookies" },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup will be implemented later
  };

  return (
    <footer className="py-12 px-4" style={{ backgroundColor: '#0c2a3e' }}>
      <div className="container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <img 
                src={knauberLogo} 
                alt="Knauber Energie" 
                className="h-12 w-auto mx-auto md:mx-0 opacity-90"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Ihr zuverlässiger Partner für Heizöl seit über 150 Jahren. 
              Als Familienunternehmen stehen wir für Qualität und Vertrauen.
            </p>
          </div>

          {/* Newsletter */}
          <div className="text-center">
            <h3 className="text-primary font-semibold mb-3">Newsletter</h3>
            <p className="text-white/80 text-sm mb-4">
              Erhalten Sie aktuelle Heizölpreise und wichtige Informationen direkt in Ihr Postfach.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-primary"
                required
              />
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
              >
                Anmelden
              </Button>
            </form>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-right">
            <h3 className="text-white font-semibold mb-3">Rechtliches</h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-white/80 hover:text-white hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Knauber Energie GmbH & Co. KG. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};