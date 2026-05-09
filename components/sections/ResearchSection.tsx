const posts = [
  {
    category: "Large Geospatial Model",
    decorativeLetter: "L",
    decorativeBg: "#dde3ea",
    title: "Towards a foundation model for the physical world",
    body: "We outline our research direction for training a model that understands geography, spatial relationships, and human movement at scale.",
    date: "Mar 2025",
    linkText: "Read paper →",
    href: "#",
  },
  {
    category: "Open Source",
    decorativeLetter: "O",
    decorativeBg: "#e2e8f2",
    title: "Releasing our geospatial embeddings",
    body: "Today we open-source the embedding model powering Columbus search — trained on 400M location-tagged data points across 190 countries.",
    date: "Feb 2025",
    linkText: "Read post →",
    href: "#",
  },
  {
    category: "Engineering",
    decorativeLetter: "E",
    decorativeBg: "#e8edf5",
    title: "How we index 3,400 datasets for sub-100ms queries",
    body: "A look inside the data pipeline that keeps Columbus fresh — from ingestion and versioning to the query layer that makes it instant.",
    date: "Jan 2025",
    linkText: "Read post →",
    href: "#",
  },
];

export function ResearchSection() {
  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        {/* Section heading */}
        <div className="mb-10 md:mb-20" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
            From our research.
          </h2>
          <p className="text-sm text-mistral-black/50 mt-3">
            Exploring the frontier of geospatial AI.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post, i) => (
            <div
              key={post.title}
              className="flex flex-col border border-[#C7D7F8] rounded-[20px] overflow-hidden bg-background"
              data-reveal
              data-reveal-delay={String(i + 1)}
            >
              {/* Category pill */}
              <div className="px-5 pt-5 pb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-mistral-black/50">
                  {post.category}
                </span>
              </div>

              {/* Decorative band */}
              <div className="px-4 pb-2">
                <div
                  className="h-32 w-full rounded-[20px] flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: post.decorativeBg }}
                >
                  <span
                    className="select-none font-normal tracking-tight text-mistral-black/10"
                    style={{ fontSize: "7rem", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    {post.decorativeLetter}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-5 pt-4 pb-5 flex flex-col flex-1 gap-3">
                <h3 className="text-base font-semibold text-mistral-black leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-mistral-black/50 leading-relaxed flex-1">
                  {post.body}
                </p>
                {/* Bottom row: date + link */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-mistral-black/30">{post.date}</span>
                  <a
                    href={post.href}
                    className="text-xs font-medium text-mistral-black underline-offset-2 hover:underline"
                  >
                    {post.linkText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
