export default function PhotoSection() {
  return (
    <section className="w-full overflow-hidden">
      <img
        src="/photo-desktop.webp"
        alt=""
        className="hidden md:block w-full h-auto object-cover"
      />
      <img
        src="/photo-mobile.webp"
        alt=""
        className="md:hidden w-full h-auto object-cover"
      />
    </section>
  );
}
