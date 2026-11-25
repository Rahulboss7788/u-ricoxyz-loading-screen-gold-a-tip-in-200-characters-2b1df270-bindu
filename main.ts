import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TIP =
  "Tip: while this loads, your agent is rewriting its own code \u2014 then blaming you for the delay. Breathe. It was never your commit.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TIP, "utf8");

// Read back and enforce the competition gate: 1-200 chars, not only whitespace.
const written = readFileSync("/output/entry.txt", "utf8");
if (written.length < 1 || written.length > 200 || written.trim().length === 0) {
  throw new Error(
    `Gate failed: entry is ${written.length} characters (must be 1-200, non-blank).`,
  );
}
if (written !== TIP) {
  throw new Error("Gate failed: /output/entry.txt does not match the tip exactly.");
}
console.log(`Wrote ${written.length}-character tip to /output/entry.txt`);
