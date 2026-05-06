import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsPage from "@/components/NewsPage";

export const metadata: Metadata = {
  title: "News — Harvey Specter",
  description: "Latest articles, stories, and achievements from H.Studio.",
};

export default function News() {
  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <NewsPage />
      </div>
      <div className="sticky bottom-0 z-0" data-nav-theme="dark">
        <Footer />
      </div>
    </>
  );
}
