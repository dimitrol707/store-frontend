import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:8080/swagger/doc.json",
      override: {
        transformer: "./src/config/inputTransformer.ts",
      },
    },
    output: {
      client: "react-query",
      httpClient: "axios",
      mode: "split",
      target: "./src/model/api.ts",
      override: {
        mutator: {
          path: "./src/config/axios.ts",
          name: "customInstance",
        },
      },
    },
  },
});
