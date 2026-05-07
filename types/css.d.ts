/**
 * Allow arbitrary CSS custom properties (--foo, --bar) inside React's
 * style objects. Mistral's markup uses these heavily for layout vars
 * like style={{ "--space-desktop": "64px" }}.
 */
import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
