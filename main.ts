// news-image-20261125: one image summing up Wednesday 25 November 2026.
// The program copies the shipped image into the grader's output directory.
// The image path is resolved from this file's own location, never from the
// working directory, because the grader runs `node /bot/main.ts` from
// elsewhere; a cwd-relative path would fail there. The output directory is
// created first so the copy never fails on a fresh container.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(scriptDir, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

if (!existsSync(sourceImage)) {
  throw new Error("entry.png is missing next to main.ts");
}

copyFileSync(sourceImage, join(outputDir, "entry.png"));
