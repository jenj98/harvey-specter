import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AboutSection2 from "@/components/AboutSection2";
import PhotoSection from "@/components/PhotoSection";
import DeliverablesSection from "@/components/DeliverablesSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsAndAchievementsSection from "@/components/NewsAndAchievementsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AboutSection2 />
      <div data-nav-theme="dark"><PhotoSection /></div>
      <div data-nav-theme="dark"><DeliverablesSection /></div>
      <SelectedWorkSection />
      <TestimonialsSection />
      <NewsAndAchievementsSection />
      <div data-nav-theme="dark"><Footer /></div>
    </>
  );
}
