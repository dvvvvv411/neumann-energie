import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import knauberLogo from "@/assets/knauber-logo.svg";

const navigationItems = [
  { name: "Unsere Produkte", href: "#produkte" },
  { name: "FAQ", href: "#faq" },
  { name: "Ihre Anfrage", href: "#anfrage" },
  { name: "Kontakt", href: "#kontakt" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Hamburger Menu */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="default"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="ml-2 text-base font-medium">Menü</span>
            </Button>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-8">
              <Button
                variant="ghost" 
                size="default"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
                <span className="ml-2 text-base">Menü</span>
              </Button>
            </nav>
          </div>

          {/* Logo - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src={knauberLogo} 
              alt="Knauber Energie" 
              className="h-16 w-auto"
            />
          </div>

          {/* Empty div for flex layout */}
          <div className="w-16"></div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-2 pt-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Desktop Menu Dropdown */}
        {isMenuOpen && (
          <div className="hidden lg:block absolute left-4 top-full mt-2 bg-background border border-border rounded-md shadow-lg z-50 min-w-[200px]">
            <nav className="py-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}