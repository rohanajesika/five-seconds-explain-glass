// Five Seconds to Explain the Glass — make.fun entry (program/v1).
//
// The job: produce the single sentence a house cat would say in its own
// defence in the five seconds after sweeping a glass off the table.
// The program writes that one sentence to /output/entry.txt.
//
// The line, and why it fits the brief:
//   - One sentence, 116 characters (limit 200), in the cat's own voice.
//   - No apology, no confession: the cat is the landlord, not the culprit.
//   - Fresh idea: the glass is a squatter in the cat's sunbeam, evicted
//     for non-payment of rent — not gravity, not a slippery edge, not
//     "it was already falling".
//   - Spoken in five seconds: a single breath, no reasoning paragraph.
//   - Every character works: sunbeam (motive), rent (cat logic),
//     evicted (the act), paperwork (the punchline, blaming the floor).

import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "The glass was squatting in my sunbeam without paying rent, so I evicted it — the floor merely handled the paperwork.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The gate the sealed scorer applies: UTF-8 text, 1 to 200 characters,
// not only white space. Refuse to write anything that would fail it, so
// a bad edit can never silently ship an invalid entry.
const chars = [...EXCUSE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`excuse is ${chars.length} characters, must be 1-200`);
}
if (!/\S/.test(EXCUSE)) {
  throw new Error("excuse is only white space");
}
const sentences = EXCUSE.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 1) {
  throw new Error(`excuse must be one sentence, found ${sentences.length}`);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, EXCUSE, "utf8");
