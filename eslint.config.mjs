import nx from "@nx/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  reactHooks.configs.flat.recommended,
  {
    ignores: ["**/dist"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: false,
          allow: [],
          depConstraints: [
            {
              sourceTag: "type:app",
              onlyDependOnLibsWithTags: ["type:lib"],
            },
            {
              sourceTag: "scope:main",
              onlyDependOnLibsWithTags: [
                "scope:main",
                "scope:shared",
                "scope:features",
              ],
            },
            {
              sourceTag: "layer:utils",
              onlyDependOnLibsWithTags: ["layer:utils"],
            },
            {
              sourceTag: "layer:ui",
              onlyDependOnLibsWithTags: ["layer:ui", "layer:utils"],
            },
            {
              sourceTag: "layer:api",
              onlyDependOnLibsWithTags: ["layer:api", "layer:utils"],
            },
            {
              sourceTag: "scope:features",
              onlyDependOnLibsWithTags: ["scope:features", "scope:shared"],
            },
          ],
        },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
]);
