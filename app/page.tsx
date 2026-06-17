import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExamplePrompts from "@/components/ExamplePrompts";
import HowItWorks from "@/components/HowItWorks";
import NeighborhoodCards from "@/components/NeighborhoodCards";
import ChatDemo from "@/components/ChatDemo";
import GlobalCoverage from "@/components/GlobalCoverage";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ExamplePrompts />
      <HowItWorks />
      <NeighborhoodCards />
      <ChatDemo />
      <GlobalCoverage />
      <Footer />
    </main>
  );
}
