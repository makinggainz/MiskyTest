// Placeholder App Store / Google Play badges + star-rating display. These are
// stand-ins to be swapped for the official Apple and Google badge assets once
// the Elio app ships. Ratings are placeholder values pending real App Store
// data — anti-pattern §11 (fabrication) acknowledged; treat as a launch
// scaffold, not as live numbers.

export function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href="#"
      aria-label="Download on the App Store"
      className={`group inline-flex items-center gap-2 rounded-[7px] bg-mistral-black text-white px-4 py-2 transition-colors hover:bg-mistral-black/85 ${className}`}
    >
      <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.05 12.04c-.03-2.93 2.4-4.34 2.5-4.41-1.36-1.99-3.49-2.27-4.24-2.3-1.81-.18-3.53 1.06-4.45 1.06-.92 0-2.34-1.04-3.85-1.01-1.98.03-3.81 1.15-4.83 2.91-2.06 3.57-.53 8.84 1.48 11.74.99 1.42 2.16 3.02 3.69 2.96 1.49-.06 2.05-.96 3.85-.96 1.79 0 2.31.96 3.88.93 1.6-.03 2.61-1.45 3.59-2.88 1.13-1.65 1.6-3.25 1.62-3.34-.04-.01-3.11-1.19-3.14-4.7zM14.18 3.95c.82-1 1.37-2.4 1.22-3.78-1.18.05-2.6.78-3.45 1.78-.76.88-1.43 2.29-1.25 3.66 1.32.1 2.65-.67 3.48-1.66z" />
      </svg>
      <span className="flex flex-col items-start leading-none gap-0.5">
        <span className="text-[9px] font-medium tracking-tight opacity-80">Download on the</span>
        <span className="text-sm font-semibold tracking-tight">App Store</span>
      </span>
    </a>
  );
}

export function PlayStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href="#"
      aria-label="Get it on Google Play"
      className={`group inline-flex items-center gap-2 rounded-[7px] bg-mistral-black text-white px-4 py-2 transition-colors hover:bg-mistral-black/85 ${className}`}
    >
      <svg className="size-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="play-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#0078FF" />
          </linearGradient>
          <linearGradient id="play-grad-b" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFCE00" />
            <stop offset="100%" stopColor="#FFB000" />
          </linearGradient>
          <linearGradient id="play-grad-c" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF3A44" />
            <stop offset="100%" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="play-grad-d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#01E16C" />
            <stop offset="100%" stopColor="#00B14B" />
          </linearGradient>
        </defs>
        <path d="M3.6 1.4c-.3.3-.5.7-.5 1.3v18.6c0 .5.2 1 .5 1.2L13.4 12 3.6 1.4z" fill="url(#play-grad-a)" />
        <path d="M16.4 15l-3-3 3-3 4.1 2.4c1.2.7 1.2 1.8 0 2.5L16.4 15z" fill="url(#play-grad-b)" />
        <path d="M16.4 9l-12.8 13c.4.4 1 .4 1.7 0l11.1-6.4-3-3 3-3.6z" fill="url(#play-grad-c)" />
        <path d="M16.4 9L5.3 2.6c-.7-.4-1.3-.4-1.7 0l12.8 13L19.4 9h-3z" fill="url(#play-grad-d)" />
      </svg>
      <span className="flex flex-col items-start leading-none gap-0.5">
        <span className="text-[9px] font-medium tracking-tight opacity-80">GET IT ON</span>
        <span className="text-sm font-semibold tracking-tight">Google Play</span>
      </span>
    </a>
  );
}

// Star-rating display per consumer-spec §31. Defaults are placeholder values.
// Five stars rendered + numeric value next to them.
export function StarRating({
  rating = 4.8,
  count = "12K",
  className = "",
}: {
  rating?: number;
  count?: string;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 text-mistral-black/65 ${className}`}>
      <span className="flex items-center gap-0.5 text-mistral-orange" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </span>
      <span className="text-xs md:text-sm font-medium tabular-nums">
        {rating.toFixed(1)} <span className="text-mistral-black/45">·</span> {count} ratings
      </span>
    </div>
  );
}
