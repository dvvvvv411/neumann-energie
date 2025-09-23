import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import knauberLogo from "@/assets/knauber-logo.svg";

const navigationItems = [
  { name: "Heizöl", href: "/" },
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Service", href: "/service" },
  { name: "Nachhaltigkeit", href: "/nachhaltigkeit" },
  { name: "Referenzen", href: "/referenzen" },
];

interface AppSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppSidebar({ isOpen, onOpenChange }: AppSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="flex items-center gap-2"
        >
          <Menu className="h-6 w-6" />
          <span className="text-base font-medium">Menü</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="w-80 p-0 bg-background border-border [&>button]:hidden"
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <img 
            src={knauberLogo} 
            alt="Knauber Energie" 
            className="h-12 w-auto"
          />
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-6 space-y-2">
          {navigationItems.map((item) => (
            <SheetClose key={item.name} asChild>
              <a
                href={item.href}
                className="flex items-center px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200 text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                {item.name}
              </a>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}