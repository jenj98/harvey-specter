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
import { client, urlFor } from "@/lib/sanity/client";

async function getNewsArticles() {
  const cacheOpt = process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate: 60 } };
  const raw = await client.fetch(
    `*[_type == "newsArticle"] | order(order asc)`,
    {},
    cacheOpt,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return raw.map((a: any) => ({
    image: urlFor(a.image).width(800).auto("format").url(),
    body: a.body as string,
  }));
}

export default async function Home() {
  const newsArticles = await getNewsArticles();

  return (
    <>
      {/* Content sits above the sticky footer (z-10 covers it while overlapping) */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <AboutSection2 />
        <div data-nav-theme="dark"><PhotoSection /></div>
        <div data-nav-theme="dark"><DeliverablesSection /></div>
        <SelectedWorkSection />
        <TestimonialsSection />
        <NewsAndAchievementsSection articles={newsArticles} />
      </div>

      {/* Footer is sticky at the bottom — content scrolls over it, revealing it */}
      <div className="sticky bottom-0 z-0" data-nav-theme="dark">
        <Footer />
      </div>
    </>
  );
}
