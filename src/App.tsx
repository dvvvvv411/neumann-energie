import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { CookieBanner } from "@/components/CookieBanner";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminAnfragen from "./pages/AdminAnfragen";
import AdminBestellungen from "./pages/AdminBestellungen";
import AdminResend from "./pages/AdminResend";
import AdminEmails from "./pages/AdminEmails";
import AdminTelefonnummer from "./pages/AdminTelefonnummer";
import AdminTelegram from "./pages/AdminTelegram";
import About from "./pages/About";
import Service from "./pages/Service";
import Sustainability from "./pages/Sustainability";
import References from "./pages/References";
import Anfrage from "./pages/Anfrage";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Widerrufsrecht from "./pages/Widerrufsrecht";
import Cookies from "./pages/Cookies";
import Barrierefreiheit from "./pages/Barrierefreiheit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieBanner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/*" element={<Admin />}>
              <Route path="anfragen" element={<AdminAnfragen />} />
              <Route path="bestellungen" element={<AdminBestellungen />} />
              <Route path="telefonnummer" element={<AdminTelefonnummer />} />
              <Route path="telegram" element={<AdminTelegram />} />
              <Route path="resend" element={<AdminResend />} />
              <Route path="emails" element={<AdminEmails />} />
            </Route>
            <Route path="/ueber-uns" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/nachhaltigkeit" element={<Sustainability />} />
            <Route path="/referenzen" element={<References />} />
            <Route path="/anfrage" element={<Anfrage />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/widerrufsrecht" element={<Widerrufsrecht />} />
            <Route path="/barrierefreiheit" element={<Barrierefreiheit />} />
            <Route path="/cookies" element={<Cookies />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
