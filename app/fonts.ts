import { Funnel_Display } from "next/font/google";
import localFont from "next/font/local";

/**
 * Funnel Display — headline / display typeface.
 * Used for all titles, hero headings, and large UI labels.
 */
export const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/**
 * Opening Hours Sans — body / reading typeface.
 * Only Regular weight available (see public/fonts/).
 */
export const openingHoursSans = localFont({
  src: [
    { path: "../public/fonts/OpeningHoursSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/OpeningHoursSans-Regular.woff",  weight: "400", style: "normal" },
  ],
  display: "swap",
  variable: "--font-body",
});
