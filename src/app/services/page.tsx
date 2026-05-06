import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesPage from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Services — Harvey Specter",
  description: "Creative direction, brand identity, photography, and digital experience design from H.Studio.",
};

export default function Services() {
  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <ServicesPage />
      </div>
      <div className="sticky bottom-0 z-0" data-nav-theme="dark">
        <Footer />
      </div>
    </>
  );
}
