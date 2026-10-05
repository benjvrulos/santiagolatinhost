import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Hero from "./components/Hero";
import Tonight from "./components/Tonight";
import ChooseSantiago from "./components/ChooseSantiago";
import Plataforma from "./components/Plataforma";
import Scale from "./components/Scale";
import ComoFunciona from "./components/ComoFunciona";
import Diferenciadores from "./components/Diferenciadores";
import Reels from "./components/Reels";
import Partners from "./components/Partners";
import Markets from "./components/Markets";
import WhyNow from "./components/WhyNow";
import Founder from "./components/Founder";
import Execution from "./components/Execution";
import Booking from "./components/Booking";
import Closing from "./components/Closing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Tonight />
      <ChooseSantiago />
      <Plataforma />
      <Scale />
      <ComoFunciona />
      <Diferenciadores />
      <Reels />
      <Partners />
      <Markets />
      <WhyNow />
      <Founder />
      <Execution />
      <Booking />
      <Closing />
      <Footer />
    </main>
  );
}