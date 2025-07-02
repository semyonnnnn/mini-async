import { CMS_BLOCK_ID } from "./app/utils/key.js";
import path from "path";
import fs from "fs";
import WebpackShellPluginNext from "webpack-shell-plugin-next";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = path.resolve(__dirname, "build");
const bundleFilename = "prod.js";
const txtFilename = "prod.txt";

export default {
  mode: "production",
  entry: "./app/app.js",
  output: {
    path: outputDir,
    filename: bundleFilename,
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [
          () => {
            const bundlePath = path.join(outputDir, bundleFilename);
            const code = fs.readFileSync(bundlePath, "utf8");
            const wrapped = `<script id="${CMS_BLOCK_ID}">\n${code}\n</script>`;
            fs.writeFileSync(
              path.join(outputDir, txtFilename),
              wrapped,
              "utf8"
            );
            console.log(
              `Generated ${txtFilename} with <script id="${CMS_BLOCK_ID}">...`
            );
          },
        ],
        blocking: true,
        parallel: false,
      },
    }),
  ],
};
