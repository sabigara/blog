import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

import { CONTAINER_WIDTH } from "./src/styles/constants";
import { tailwindTypographyConfig } from "./src/styles/tailwind/typography";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/mdx/components.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
      },
      maxWidth: {
        container: CONTAINER_WIDTH,
      },
      typography: tailwindTypographyConfig,
    },
  },
  plugins: [typography],
};
export default config;
