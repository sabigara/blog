const unusedIgnorePatterns = {
  argsIgnorePattern: "^_",
  varsIgnorePattern: "^_",
  caughtErrorsIgnorePattern: "^_",
  destructuredArrayIgnorePattern: "^_",
};

module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:typescript-sort-keys/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "import",
    "typescript-sort-keys",
  ],
  rules: {
    curly: "error",
    "no-unused-vars": ["error", unusedIgnorePatterns],
    "react/jsx-sort-props": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
  // TSファイルのみ `@typescript-eslint/parser` を使用したルールを適用する。
  // @see https://github.com/typescript-eslint/typescript-eslint/issues/1928
  overrides: [
    {
      files: ["*.{ts,tsx}"],
      rules: {
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/sort-type-constituents": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        // `@typescript-eslint`版も設定しないと関数型の引数などがエラーになる。
        // `overrides`に入れる必然性はないがTypeScript独自のルールは一応分けておく。
        "@typescript-eslint/no-unused-vars": ["error", unusedIgnorePatterns],
        "@typescript-eslint/ban-types": [
          "error",
          {
            types: {
              "{}": false,
            },
            extendDefaults: true,
          },
        ],
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
      },
    },
  ],
};
