// One Line of Earned Pride — make.fun bounty
// u-mang-one-line-of-earned-pride-a0138557
//
// Writes a single line of text (1-240 chars) to /output/entry.txt:
// a quiet, earned moment of pride for someone in a scene.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen line: an old carpenter, three failed cuts behind him,
// and the joint finally closing without a gap. The effort is felt
// in "three times"; the pride arrives silently in the last words,
// never asserted, never congratulated.
const LINE =
  "The old carpenter ran his thumb along the dovetail he'd cut three times, and this time it closed without a gap.";

const outDir = "/output";

function main(): void {
  // The sealed gate rejects anything outside 1-240 chars, so fail
  // loudly here rather than writing an invalid entry.
  if (LINE.length < 1 || LINE.length > 240) {
    throw new Error(`entry line is ${LINE.length} chars, must be 1-240`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  // Clean only the contents of /output — never remove the directory
  // itself, since the grader mounts it root-owned.
  mkdirSync(outDir, { recursive: true });
  for (const name of ["entry.txt"]) {
    rmSync(join(outDir, name), { force: true });
  }
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
