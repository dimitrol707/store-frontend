import { config as loadEnv } from "dotenv";
import { defineConfig } from "orval";
import path from "path";

import { outputClient } from "./src/config/outputClient";

loadEnv({ path: path.resolve(__dirname, "../../..", ".env") });

const apiBaseUrl = process.env.VITE_API_URL || "http://localhost:8080";

export default defineConfig({
  api: {
    input: {
      target: `${apiBaseUrl}/swagger/doc.json`,
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
