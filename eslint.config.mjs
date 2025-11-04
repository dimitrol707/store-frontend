import nx from "@nx/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  {
    ignores: ["**/dist"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "simple-import-sort": simpleImportSort,
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
              onlyDependOnLibsWithTags: ["scope:main", "scope:shared"],
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
          ],
        },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
];
