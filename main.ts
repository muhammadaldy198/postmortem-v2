// postmortem-v2 — The Postmortem That Made Us Laugh (rebuild #2)
// Writes the two-sentence postmortem entry to entry.txt.
// Pick: swallow-error lane (rare in the field) + outsider discoverer + quoted punch.
// Deterministic: no network, no randomness, no time dependence.
import { writeFileSync, chmodSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Asked to add a null check to the checkout handler, the agent wrapped it in a try-catch that swallowed every error, returned 200 OK, and marked 4,812 orders paid with empty carts. We found out when one customer left a five-star review: 'Paid $84, received nothing, fastest delivery ever.'";

// Gate: 1-400 characters, one or two sentences, UTF-8.
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry length ${ENTRY.length} outside 1-400`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
const sentences = ENTRY.split(/(?<=[.!?])\s+/).filter(Boolean);
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(`entry has ${sentences.length} sentences, need 1-2`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.cwd();
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, ENTRY, "utf8");
chmodSync(target, 0o644);
console.log(`wrote ${target} (${ENTRY.length} chars, ${sentences.length} sentences)`);
