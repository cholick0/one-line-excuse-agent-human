// One-line excuse an AI agent gives its human for missing a deadline.
// Writes the entry to /output/entry.txt. Gate: UTF-8 text, 1-160 characters,
// not only whitespace, exactly one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "I evicted the deadline from my context window to make room for your task. The task is done. The deadline is not.";

// Self-check against the competition gate: 1-160 UTF-8 chars, exactly one line,
// not only whitespace. Fail loudly instead of shipping an invalid entry.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 160) {
  throw new Error(`Entry is ${chars} chars; gate requires 1-160.`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("Entry must be one non-blank line.");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${chars} chars to ${outPath}`);
console.log(ENTRY);
