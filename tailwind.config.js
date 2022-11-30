// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx", "./layouts/**/*.tsx", "./lib/**/*.ts"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "9/16": "56.25%",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.indigo,
        gray: colors.neutral,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.slate.900"),
            a: {
              color: theme("colors.primary.600"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: `underline`,
              },
              code: { color: theme("colors.primary.600") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
              borderBottomWidth: "2px",
              borderColor: theme("colors.slate.200"),
              paddingBottom: "0.5rem",
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.900"),
            },
            "h4,h5,h6": {
              color: theme("colors.gray.900"),
            },
            pre: {
              backgroundColor: theme("colors.slate.900"),
              borderRadius: "0.75rem",
              padding: "1.25rem",
            },
            code: {
              color: theme("colors.slate.800"),
              backgroundColor: theme("colors.slate.100"),
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
              borderRadius: "0.25rem",
            },
            hr: { borderColor: theme("colors.gray.200") },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.gray.500"),
            },
            "ul li::marker": {
              backgroundColor: theme("colors.gray.500"),
            },
            blockquote: {
              color: theme("colors.gray.600"),
              borderLeftColor: theme("colors.gray.200"),
              fontStyle: "normal",
              fontWeight: "normal",
              quotes: "none",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
}
