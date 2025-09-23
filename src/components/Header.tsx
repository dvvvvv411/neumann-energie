import { useState } from "react";
import knauberLogo from "@/assets/knauber-logo.svg";
import { AppSidebar } from "@/components/AppSidebar";

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Sidebar Trigger */}
          <div className="flex items-center">
            <AppSidebar 
              isOpen={isSidebarOpen} 
              onOpenChange={setIsSidebarOpen}
            />
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
      </div>
    </header>
  );
}