import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          {/* Logo - Centered */}
          <Link to="/">
            <img 
              src="/lovable-uploads/neumannlogo.png.png" 
              alt="Neumann Energie" 
              className="h-16 w-auto cursor-pointer hover-scale"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}