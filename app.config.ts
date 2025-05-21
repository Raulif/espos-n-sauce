import fs from "fs";
import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";

// Config to copy CSS files from app to public during build
const copyAppCssToPublic = () => {
  return {
    name: "copy-css-to-public",
    writeBundle() {
      // Make sure the public directory exists
      if (!fs.existsSync("./public")) {
        fs.mkdirSync("./public", { recursive: true });
      }

      // Copy CSS from app to public
      if (fs.existsSync("./app/styles/global.css")) {
        fs.copyFileSync("./app/styles/global.css", "./public/styles.css");
      }
    },
  };
};

export default defineConfig({
  tsr: {
    appDirectory: "app",
  },
  vite: {
    css: {},
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      // copyAppCssToPublic()
    ],
  },
});
