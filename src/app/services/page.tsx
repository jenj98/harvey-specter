import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesPage, { type Offering } from "@/components/ServicesPage";
import { client, urlFor } from "@/lib/sanity/client";

export const metadata: Metadata = {
  title: "Services — Harvey Specter",
  description: "Creative direction, brand identity, photography, and digital experience design from H.Studio.",
};

async function getServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc, _createdAt asc) {
      _id, title, image, description, deliverables
    }`,
    {},
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } }
  );
}

export default async function Services() {
  const data = await getServices();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offerings: Offering[] | undefined = data?.length > 0
    ? data.map((o: any, i: number) => ({
        num: String(i + 1).padStart(2, "0"),
        title: o.title,
        image: urlFor(o.image).width(900).auto("format").url(),
        description: o.description,
        deliverables: o.deliverables ?? [],
      }))
    : undefined;

  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <ServicesPage offerings={offerings} />
      </div>
      <div className="sticky bottom-0 z-0" data-nav-theme="dark">
        <Footer />
      </div>
    </>
  );
}
