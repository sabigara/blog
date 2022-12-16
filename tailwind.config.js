// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

const radius = "0.5rem"

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
        sans: defaultTheme.fontFamily.sans,
      },
      colors: {
        primary: colors.indigo,
        gray: colors.neutral,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            fontSize: "1.1rem",
            lineHeight: "1.7",
            a: {
              color: theme("colors.primary.600"),
              textDecoration: "none",
              fontWeight: "400",
              "&:hover": {
                textDecoration: `underline`,
              },
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
              code: {
                fontSize: "0.9em",
              },
            },
            code: {
              color: theme("colors.gray.800"),
              backgroundColor: theme("colors.gray.100"),
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: "0.25rem",
              fontWeight: "400",
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
              color: theme("colors.gray.800"),
            },
            "ul li::marker": {
              color: theme("colors.gray.800"),
            },
            blockquote: {
              color: theme("colors.gray.600"),
              borderLeftColor: theme("colors.gray.200"),
              fontStyle: "normal",
              fontWeight: "normal",
              quotes: "none",
            },
            img: {
              borderRadius: radius,
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
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
}
