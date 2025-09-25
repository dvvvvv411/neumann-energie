import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { LandingPageSidebar } from "./LandingPageSidebar";
import { Button } from "./ui/button";

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Hamburger Menu */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2"
          >
            <Menu className="h-5 w-5" />
            <span className="text-sm font-medium">Menü</span>
          </Button>

          {/* Logo - Centered */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="/lovable-uploads/neumannlogo.png.png" 
              alt="Neumann Energie" 
              className="h-16 w-auto cursor-pointer hover-scale"
            />
          </Link>

          {/* Spacer for layout balance */}
          <div className="w-20"></div>
        </div>
      </div>

      <LandingPageSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </header>
  );
}