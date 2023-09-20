import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="">
      <Navbar/>
      <HeroSection />
      <HowItWorks/>
      <FAQ/>
      <Footer/>
    </main>
  );
}
