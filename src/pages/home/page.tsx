import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Hero from "./components/Hero";
import AIPlanner from "./components/AIPlanner";
import Tonight from "./components/Tonight";
import Marketplace from "./components/Marketplace";
import ComoFunciona from "./components/ComoFunciona";
import Partners from "./components/Partners";
import Technology from "./components/Technology";
import Recognition from "./components/Recognition";
import Booking from "./components/Booking";
import Closing from "./components/Closing";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AIPlanner />
      <Tonight />
      <Marketplace />
      <ComoFunciona />
      <Partners />
      <Technology />
      <Recognition />
      <Booking />
      <Closing />
    </>
  );
}
