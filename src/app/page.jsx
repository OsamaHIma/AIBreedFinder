import HeroSection from "@/components/home/HeroSection";
import AboutUs from "@/components/home/AboutUs";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";

const HomePage = () => {
  return (
    <main className="relative">
      <div className="gradient absolute left-[100px] h-80 w-80 bg-black/20 blur-[100px] dark:bg-white/10" />
      <HeroSection />
      <AboutUs/>
      <HowItWorks />
      <FAQ />
      <div className="gradient absolute -top-24 right-[100px] h-80 w-80 bg-indigo-600/30 blur-[100px]" />
    </main>
  );
}
export default HomePage
