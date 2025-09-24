import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Service from "./pages/Service";
import Sustainability from "./pages/Sustainability";
import References from "./pages/References";
import Anfrage from "./pages/Anfrage";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Widerrufsrecht from "./pages/Widerrufsrecht";
import Barrierefreiheit from "./pages/Barrierefreiheit";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
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
  </QueryClientProvider>
);

export default App;
