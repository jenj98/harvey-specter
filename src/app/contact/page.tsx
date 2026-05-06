import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Harvey Specter",
  description: "Get in touch with H.Studio to start your next project.",
};

export default function Contact() {
  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <ContactPage />
      </div>
      <div className="sticky bottom-0 z-0" data-nav-theme="dark">
        <Footer />
      </div>
    </>
  );
}
