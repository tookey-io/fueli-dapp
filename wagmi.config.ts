import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/wagmi/generated.ts",
  plugins: [
    hardhat({
      project: "./onchain",
    }),
    react({

    })
  ],
});
