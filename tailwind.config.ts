import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const radius = "0.5rem";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            fontSize: "1rem",
            lineHeight: "1.7",
            maxWidth: "unset",
            a: {
              color: theme("colors.primary.600"),
              fontWeight: "400",
              code: { color: theme("colors.primary.600") },
            },
            h1: {
              fontWeight: "600",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h2: {
              fontWeight: "600",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
              borderBottomWidth: "1px",
              borderColor: theme("colors.gray.300"),
              paddingBottom: "0.3rem",
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.900"),
            },
            "h4,h5,h6": {
              color: theme("colors.gray.900"),
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              borderRadius: radius,
              padding: "1.25rem",
              lineHeight: 1.5,
            },
            code: {
              color: theme("colors.gray.800"),
              backgroundColor: theme("colors.gray.100"),
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: "0.25rem",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            details: {
              backgroundColor: theme("colors.gray.100"),
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: radius,
            },
            hr: {
              borderColor: theme("colors.gray.200"),
            },
            li: { margin: "0.25rem 0" },
            "ol li::marker": {
              fontWeight: "400",
              color: theme("colors.gray.400"),
            },
            "ul li::marker": {
              color: theme("colors.gray.400"),
            },
            blockquote: {
              color: theme("colors.gray.600"),
              borderLeftColor: theme("colors.gray.200"),
              fontStyle: "normal",
              fontWeight: "normal",
              quotes: "none",
            },
            img: {
              margin: "0 auto",
            },
            video: {
              borderRadius: radius,
            },
            iframe: {
              borderRadius: radius,
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
export default config;
