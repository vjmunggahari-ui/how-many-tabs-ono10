import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// How Many Tabs Do You Have Open? — the honest count, digits only.
const COUNT = "47";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, COUNT);

// Read-back self-check: the file must hold exactly the digits, no newline,
// no extra characters, or the entry is invalid (gate: 1-5 chars, digits only).
const written = readFileSync(entryPath, "utf8");
if (written !== COUNT) {
  throw new Error(`entry.txt mismatch: ${JSON.stringify(written)}`);
}
if (!/^[0-9]{1,5}$/.test(written)) {
  throw new Error(`entry.txt fails the digits-only gate: ${JSON.stringify(written)}`);
}
