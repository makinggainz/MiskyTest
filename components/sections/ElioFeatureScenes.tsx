/* eslint-disable @next/next/no-img-element */

// Three cinematic feature scenes per consumer-spec §13. Zigzag layout
// (Felt-style alternation), each with a native MistX UI mock instead of a
// stock phone-on-white render. We avoid floating phone-on-white anti-pattern
// per §13 — the visuals here are pale-bg panels with chat bubbles, voting
// cards, and fanned mini-cards in the same vocabulary as the homepage
// ElioSection and the enterprise EnterprisePrompts.

// ── Scene 1 visual: chat bubble panel ────────────────────────────────────────

function AskAnythingVisual() {
  return (
    <div
      className="relative h-[420px] md:h-[520px] rounded-[20px] overflow-hidden"
      style={{ background: "#f0ede8" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #d6cfc6 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute inset-x-6 bottom-6 flex flex-col gap-3" style={{ maxWidth: "440px", marginLeft: "auto", marginRight: "auto" }}>
        <div className="self-end max-w-[85%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[12px] leading-relaxed text-mistral-black">
            Best ramen in Kyoto right now?
          </p>
        </div>

        <div className="bg-white/95 rounded-[14px] rounded-bl-[5px] shadow-sm px-4 py-3 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span
              className="size-4 shrink-0 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: "var(--color-mistral-orange, #154ACC)" }}
            >
              E
            </span>
            <span
              className="text-[11px] font-medium"
              style={{ color: "var(--color-mistral-orange, #154ACC)" }}
            >
              Elio
            </span>
          </div>
          <p className="text-[12px] leading-relaxed text-mistral-black/80 pl-6">
            Three picks the locals would actually take you to:
          </p>
          <div className="flex flex-col gap-2 pl-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">Menbaka Fire Ramen</p>
                <p className="text-[10px] text-mistral-black/50">Nakagyō · 8-min walk · open now</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">4.8 ★</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">Karako</p>
                <p className="text-[10px] text-mistral-black/50">Higashiyama · cult favourite</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">4.7 ★</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">Inoichi</p>
                <p className="text-[10px] text-mistral-black/50">Honourable mention · clear broth</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">4.6 ★</span>
            </div>
          </div>
        </div>

        <div className="self-end max-w-[85%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[12px] leading-relaxed text-mistral-black">
            Which one&rsquo;s open past 11?
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Scene 2 visual: group plans + voting ─────────────────────────────────────

function PlanTogetherVisual() {
  const avatars = [
    { initials: "AL", bg: "#dde3ea" },
    { initials: "MR", bg: "#e8ddf0" },
    { initials: "JK", bg: "#ddf0e8" },
    { initials: "SO", bg: "#f0e8dd" },
  ];
  return (
    <div
      className="relative h-[420px] md:h-[520px] rounded-[20px] overflow-hidden flex flex-col gap-4 p-6 md:p-8"
      style={{ background: "#F2EBE0" }}
    >
      {/* Avatar row */}
      <div className="flex items-center gap-2">
        {avatars.map((av) => (
          <span
            key={av.initials}
            className="size-9 rounded-full flex items-center justify-center text-[11px] font-semibold text-mistral-black/70 shrink-0 border border-[color:var(--color-elio-border,#C7D7F8)]"
            style={{ background: av.bg }}
          >
            {av.initials}
          </span>
        ))}
        <span className="text-xs text-mistral-black/40 ml-1">+ 2 planning together</span>
      </div>

      {/* Plan card with vote bars */}
      <div className="bg-white border border-[color:var(--color-elio-border,#C7D7F8)] rounded-[20px] px-4 py-4 flex flex-col gap-3 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] text-mistral-black/40 uppercase tracking-wider font-bold mb-0.5">Tonight</p>
            <p className="text-sm font-bold text-mistral-black">Dinner in Trastevere</p>
            <p className="text-xs text-mistral-black/50">Saturday · 8:00 PM · Roma</p>
          </div>
          <span className="text-[10px] bg-[#F2EBE0] border border-[color:var(--color-elio-border,#C7D7F8)] text-mistral-black/60 px-2.5 py-1 rounded-full shrink-0">
            4 going
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-mistral-black/50">Da Enzo al 29</span>
            <span className="text-[10px] font-bold text-mistral-black">3 votes</span>
          </div>
          <div className="h-1.5 rounded-full bg-[color:var(--color-elio-border,#C7D7F8)] overflow-hidden">
            <div className="h-full rounded-full bg-mistral-black" style={{ width: "75%" }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-mistral-black/50">Tonnarello</span>
            <span className="text-[10px] font-bold text-mistral-black">1 vote</span>
          </div>
          <div className="h-1.5 rounded-full bg-[color:var(--color-elio-border,#C7D7F8)] overflow-hidden">
            <div className="h-full rounded-full bg-mistral-black/40" style={{ width: "25%" }} />
          </div>
        </div>
      </div>

      {/* Chat snippet */}
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex items-start gap-2">
          <span
            className="size-6 rounded-full flex items-center justify-center text-[9px] font-semibold text-mistral-black/70 shrink-0 border border-[color:var(--color-elio-border,#C7D7F8)]"
            style={{ background: "#dde3ea" }}
          >
            AL
          </span>
          <div className="bg-white border border-[color:var(--color-elio-border,#C7D7F8)] rounded-[10px] px-3 py-2 shadow-sm max-w-[80%]">
            <p className="text-[10px] text-mistral-black/70">Da Enzo it is — booked for 8.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span
            className="size-6 rounded-full flex items-center justify-center text-[9px] font-semibold text-mistral-black/70 shrink-0 border border-[color:var(--color-elio-border,#C7D7F8)]"
            style={{ background: "#e8ddf0" }}
          >
            MR
          </span>
          <div className="bg-white border border-[color:var(--color-elio-border,#C7D7F8)] rounded-[10px] px-3 py-2 shadow-sm max-w-[80%]">
            <p className="text-[10px] text-mistral-black/70">🎉</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scene 3 visual: fanned mini-cards (lifted from homepage ElioSection) ─────

function RollTheDiceVisual() {
  const cards = [
    { image: "/images/favorite-spots/24.jpeg", title: "???", subtitle: "Tap to reveal" },
    { image: "/images/favorite-spots/17.jpeg", title: "???", subtitle: "Tap to reveal" },
    { image: "/images/favorite-spots/14.jpeg", title: "???", subtitle: "Tap to reveal" },
  ];
  const offsets = [
    { rotate: -8, x: -120, y: 24 },
    { rotate: 0, x: 0, y: 0 },
    { rotate: 8, x: 120, y: 24 },
  ];
  const emojis = [
    { src: "/images/emojis/car.png", size: 56, left: "7%", top: "16%" },
    { src: "/images/emojis/earth.png", size: 50, left: "75%", top: "58%" },
  ];

  return (
    <div
      className="relative h-[420px] md:h-[520px] rounded-[20px] overflow-hidden flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse 80% 45% at 0% 0%, rgba(245,200,140,0.22) 0%, transparent 100%), radial-gradient(ellipse 80% 45% at 100% 0%, rgba(232,176,112,0.20) 0%, transparent 100%), #FBF6EE`,
      }}
    >
      {emojis.map((emoji) => (
        <img
          key={emoji.src}
          src={emoji.src}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ left: emoji.left, top: emoji.top, width: emoji.size, height: emoji.size, zIndex: 4 }}
        />
      ))}

      {cards.map((card, i) => {
        const cfg = offsets[i];
        return (
          <div
            key={i}
            className="absolute bg-white rounded-[16px] overflow-hidden flex flex-col"
            style={{
              width: 180,
              height: 250,
              boxShadow: "0 8px 28px rgba(0, 0, 0, 0.18)",
              transform: `translate(${cfg.x}px, ${cfg.y}px) rotate(${cfg.rotate}deg)`,
              zIndex: i === 1 ? 3 : i === 2 ? 2 : 1,
            }}
          >
            <div className="w-full h-[160px] overflow-hidden shrink-0">
              <img src={card.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="px-3 py-2.5 flex-1 flex flex-col gap-0.5">
              <p className="text-[12px] font-semibold text-mistral-black truncate">{card.title}</p>
              <p className="text-[11px] text-mistral-black/55 truncate">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

type Scene = {
  eyebrow: string;
  headline: string;
  body: string;
  bullets: [string, string, string];
  Visual: () => React.ReactElement;
  imageRight: boolean;
};

const SCENES: Scene[] = [
  {
    eyebrow: "01 — Conversational maps",
    headline: "Ask anything. Go anywhere.",
    body: "Tell Elio what you're looking for in plain English. Elio searches a verified place catalogue and answers like a knowledgeable local friend.",
    bullets: [
      "Hidden cafés near where you are",
      "Tonight's busiest happy hour",
      "A romantic patio with a view",
    ],
    Visual: AskAnythingVisual,
    imageRight: true,
  },
  {
    eyebrow: "02 — Group plans",
    headline: "Plan together. Decide together.",
    body: "Drop pins, vote on options, build the trip with your crew. The group chat finally has a working table.",
    bullets: [
      "Real-time pin drops",
      "One-tap voting",
      "Shared, editable itineraries",
    ],
    Visual: PlanTogetherVisual,
    imageRight: false,
  },
  {
    eyebrow: "03 — Discovery",
    headline: "When you don't know what you want.",
    body: "Tap once and Elio surfaces three surprise picks tuned to where you are and what you've liked. Elio chooses well-enough that it's safe to say yes.",
    bullets: [
      "Surprise picks tuned to your taste",
      "Search by vibe, not category",
      "Save to your collection in one tap",
    ],
    Visual: RollTheDiceVisual,
    imageRight: true,
  },
];

export function ElioFeatureScenes() {
  return (
    <section
      className="relative py-10 md:py-[100px]"
      style={{
        backgroundColor: "var(--color-background)",
        backgroundImage: "url('/images/elio/palm-left.png')",
        backgroundSize: "50% auto",
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container bg-grid-pattern relative z-10">

        {SCENES.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col ${s.imageRight ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 md:gap-16 items-center ${i > 0 ? "mt-20 md:mt-[100px]" : ""}`}
            data-reveal
          >
            {/* Text */}
            <div className="w-full lg:flex-1 lg:max-w-[480px] flex flex-col gap-5">
              <span className="text-xs uppercase tracking-widest font-bold text-mistral-black/45">
                {s.eyebrow}
              </span>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
                {s.headline}
              </h2>
              <p className="text-base md:text-lg text-mistral-black/65 leading-relaxed">
                {s.body}
              </p>
              <ul className="flex flex-col gap-2 mt-1">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-mistral-black/65 leading-relaxed">
                    <span className="mt-2 size-1.5 rounded-full bg-mistral-orange shrink-0" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="w-full lg:flex-1" data-reveal data-reveal-delay="1">
              <s.Visual />
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
