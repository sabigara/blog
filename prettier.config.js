/** @type {import('prettier').Options} */
module.exports = {
  semi: false,
  singleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  bracketSpacing: true,
  overrides: [
    {
      files: ["*.md", "README"],
      options: {
        parser: "markdown-nocjsp",
      },
    },
    {
      files: ["*.mdx"],
      options: {
        parser: "mdx-nocjsp",
      },
    },
  ],
}
