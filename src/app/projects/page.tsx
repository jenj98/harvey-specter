import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsPage, { type Project } from "@/components/ProjectsPage";
import { client, urlFor } from "@/lib/sanity/client";

export const metadata: Metadata = {
  title: "Projects — Harvey Specter",
  description: "Selected work from H.Studio — creative direction, brand identity, photography, and web design.",
};

async function getProjects() {
  return client.fetch(
    `*[_type == "selectedWork"] | order(order asc) {
      _id, title, slug, image, tags, order
    }`,
    {},
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } }
  );
}

export default async function Projects() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = await getProjects();

  const projects: Project[] = data.map((w) => ({
    _id: w._id,
    title: w.title,
    slug: w.slug.current,
    imageUrl: urlFor(w.image).width(1200).auto("format").url(),
    imageAlt: w.image.alt ?? w.title,
    tags: w.tags ?? [],
    order: w.order,
  }));

  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <ProjectsPage projects={projects} />
      </div>
      <div className="sticky bottom-0 z-0" data-nav-theme="dark">
        <Footer />
      </div>
    </>
  );
}
