import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface LandingPageSidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigationItems = [
  { title: "Startseite", href: "/" },
  { title: "Über uns", href: "/ueber-uns" },
  { title: "Service", href: "/service" },
  { title: "Nachhaltigkeit", href: "/nachhaltigkeit" },
  { title: "Referenzen", href: "/referenzen" },
];

export function LandingPageSidebar({ open, onClose }: LandingPageSidebarProps) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <SheetHeader className="p-6 border-b border-border">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/neumannlogo.png.png" 
                alt="Neumann Energie" 
                className="h-16 w-auto"
              />
            </div>
          </SheetHeader>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleLinkClick}
                  className="story-link relative block px-4 py-3 text-lg font-medium text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}