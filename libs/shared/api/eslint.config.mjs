import baseConfig from "../../../eslint.config.mjs";

export default [
  ...baseConfig,
  {
    files: ["src/model/*.ts"], // или нужный паттерн
    rules: {
      "simple-import-sort/imports": "off",
      "simple-import-sort/exports": "off",
    },
  },
];
