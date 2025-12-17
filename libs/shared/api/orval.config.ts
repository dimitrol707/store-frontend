import { defineConfig } from "orval";

import { outputClient } from "./src/config/outputClient";

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:8080/swagger/doc.json",
      override: {
        transformer: "./src/config/inputTransformer.ts",
      },
    },
    output: {
      client: outputClient,
      httpClient: "axios",
      mode: "split",
      target: "./src/model/api.ts",
      override: {
        mutator: {
          path: "./src/config/axios.ts",
          name: "customInstance",
        },
        operations: {
          getProductSearch: {
            query: {
              useQuery: true,
              useInfinite: true,
              useInfiniteQueryParam: "offset",
            },
          },
        },
      },
    },
  },
});
