import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import fs from "fs/promises";

function genCtfJson(): Plugin {
  return {
    name: "gen-json-file",
    buildStart: async () => {
      const filePath = new URL("../../config.json", import.meta.url);
      const contents = await fs.readFile(filePath, { encoding: "utf8" });

      const outFilePath = new URL("./ctf.json", import.meta.url);
      await fs.writeFile(outFilePath, JSON.stringify(JSON.parse(contents).ctf, null, 4), {
        encoding: "utf8",
      });
    },
  };
}

export default defineConfig({
  plugins: [genCtfJson(), TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
});
