import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsOpen(false);
  };

  const handleSettings = () => {
    localStorage.setItem('cookie-consent', 'settings');
    setIsOpen(false);
    navigate('/datenschutz');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-lg z-50 bg-background border border-border rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-2">
      <div className="space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/neumannlogo.png.png" 
            alt="Neumann Lubrikat GmbH" 
            className="h-12 w-auto"
          />
        </div>
        
        <h2 className="text-center text-lg font-semibold">
          Cookie-Einstellungen
        </h2>
        
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          Wir, die Neumann Lubrikat GmbH, verwenden Cookies, um Ihnen eine reibungslose 
          Funktionalität unserer Website zu gewährleisten. Diese Cookies sind für den Betrieb 
          der Seite notwendig. Weitere Cookies dienen anonymen Statistikzwecken, 
          Komforteinstellungen oder der Anzeige personalisierter Inhalte. Bitte beachten Sie, 
          dass je nach Wahl Ihrer Kategorie nicht mehr alle Funktionalitäten der Seite zur 
          Verfügung stehen. Weitere Informationen finden Sie in unseren Datenschutzbestimmungen. 
          Sie erteilen Ihre Einwilligung für alle Websites von Neumann Lubrikat GmbH.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6">
        <Button 
          variant="neumann" 
          onClick={handleAccept}
          className="flex-1"
        >
          Akzeptieren
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={handleSettings}
          className="flex-1"
        >
          Einstellungen
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleDecline}
          className="flex-1"
        >
          Ablehnen
        </Button>
      </div>
    </div>
  );
}