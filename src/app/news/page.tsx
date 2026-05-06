import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsPage from "@/components/NewsPage";
import { client, urlFor } from "@/lib/sanity/client";

export const metadata: Metadata = {
  title: "News — Harvey Specter",
  description: "Latest articles, stories, and achievements from H.Studio.",
};

async function getArticles() {
  const cacheOpt = process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate: 60 } };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any[] = await client.fetch(
    `*[_type == "newsArticle"] | order(order asc)`,
    {},
    cacheOpt,
  );
  return raw.map((a, i) => ({
    num: String(i + 1).padStart(2, "0"),
    category: a.category as string,
    date: a.date as string,
    headline: a.title as string,
    body: a.body as string,
    image: urlFor(a.image).width(900).auto("format").url(),
  }));
}

export default async function News() {
  const articles = await getArticles();

  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <NewsPage articles={articles} />
      </div>
      <div className="sticky bottom-0 z-0" data-nav-theme="dark">
        <Footer />
      </div>
    </>
  );
}
