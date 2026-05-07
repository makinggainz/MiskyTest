import { Rubik, DM_Sans } from "next/font/google";

/**
 * Mistral's homepage uses Rubik (Google Fonts). Loaded via next/font/google
 * so weights are subsetted at build time and a CSS variable is available
 * for the rest of the project.
 */
export const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * DM Sans — used by the /ColumbusDesign showcase page. ColumbusPage's M3
 * type scale resolves both `--md-ref-typeface-brand` and `-plain` to
 * DM Sans, so this is the canonical face for that demo.
 */
export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});
