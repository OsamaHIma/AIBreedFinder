import NavbarWithMegaMenu from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main className="">
      <NavbarWithMegaMenu/>
      <HeroSection />
      <HowItWorks/>
    </main>
  );
}
