/* eslint-disable @next/next/no-img-element */

// Design-partner logo strip for the /enterprise page. Honestly labeled per
// landing-page-spec §11: in private-beta stage with no GA customers, the
// strip is for design partners and pilots, not "trusted by 10,000+".

const PARTNER_LOGOS = [
  { src: "/images/partner-logos/logo1.png", alt: "Design partner" },
  { src: "/images/partner-logos/logo2.png", alt: "Design partner" },
  { src: "/images/partner-logos/logo4.png", alt: "Design partner" },
  { src: "/images/partner-logos/logo6.png", alt: "Design partner" },
  { src: "/images/partner-logos/logo7.png", alt: "Design partner" },
  { src: "/images/partner-logos/image1.png", alt: "Design partner" },
  { src: "/images/partner-logos/image2.png", alt: "Design partner" },
];

export function DesignPartnersStrip() {
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <p className="text-center text-xs md:text-sm uppercase tracking-widest text-mistral-black/45 mb-6 md:mb-10">
          Working with teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-14 gap-y-6">
          {PARTNER_LOGOS.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="h-7 md:h-9 w-auto object-contain"
              style={{ filter: "grayscale(100%) opacity(0.5)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
