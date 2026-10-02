import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Hero from "./components/Hero";
import Plataforma from "./components/Plataforma";
import Problema from "./components/Problema";
import Experiencias from "./components/Experiencias";
import Audiencia from "./components/Audiencia";
import ComoFunciona from "./components/ComoFunciona";
import Diferenciadores from "./components/Diferenciadores";
import Seguridad from "./components/Seguridad";
import Alianzas from "./components/Alianzas";
import Booking from "./components/Booking";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Plataforma />
      <Problema />
      <Experiencias />
      <Audiencia />
      <ComoFunciona />
      <Diferenciadores />
      <Seguridad />
      <Alianzas />
      <Booking />
      <Footer />
    </main>
  );
}