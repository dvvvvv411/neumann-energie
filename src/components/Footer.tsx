import { Link } from "react-router-dom";
import knauberLogo from "@/assets/knauber-logo.svg";

export const Footer = () => {
  const legalLinks = [
    { name: "Widerrufsrecht", path: "/widerrufsrecht" },
    { name: "Impressum", path: "/impressum" },
    { name: "Datenschutz", path: "/datenschutz" },
    { name: "Barrierefreiheitserklärung", path: "/barrierefreiheit" },
    { name: "Cookies", path: "/cookies" },
  ];

  return (
    <footer className="py-8 px-4" style={{ backgroundColor: '#0c2a3e' }}>
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src={knauberLogo} 
              alt="Knauber Energie" 
              className="h-12 w-auto opacity-90"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          
          {/* Legal Links */}
          <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-white/80">
            {legalLinks.map((link, index) => (
              <div key={link.path} className="flex items-center">
                <Link
                  to={link.path}
                  className="text-sm hover:text-white transition-colors duration-200 hover:underline"
                >
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="hidden sm:block ml-6 text-white/40">|</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};