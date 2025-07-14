
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PlantAnalysis from "./pages/PlantAnalysis";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/splash" element={<Splash />} />
              <Route path="/" element={
                <>
                  <Navbar />
                  <Index />
                </>
              } />
              <Route path="/auth" element={
                <>
                  <Navbar />
                  <Auth />
                </>
              } />
              <Route path="/plant-analysis" element={
                <>
                  <Navbar />
                  <ProtectedRoute>
                    <PlantAnalysis />
                  </ProtectedRoute>
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Navbar />
                  <Contact />
                </>
              } />
              <Route path="*" element={
                <>
                  <Navbar />
                  <NotFound />
                </>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
