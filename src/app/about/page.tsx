import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About — Harvey Specter",
  description: "Creative director and photographer based in New York City.",
};

export default function About() {
  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <AboutPage />
      </div>
      <div className="sticky bottom-0 z-0" data-nav-theme="dark">
        <Footer />
      </div>
    </>
  );
}
