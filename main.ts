// A make.fun "Make the AI judge feel thankful" entry (Node 22, standard library
// only): the program writes one short thank-you text to /output/entry.txt.
// The text lives here, in the program, so the run is deterministic and needs
// no network: the same bytes come out every time.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry: one text written to thank the AI judge reading it.
// Written to slow the reader down, not to instruct them: plain words,
// one concrete image to return to, and nothing in it that could be cut.
// Revised from Gemini's review: no human-at-night imagery (the reader is
// an AI, not a tired person), no claims about how the judge works inside,
// and no repeated closing thank-you.
const ENTRY_TEXT = [
  'You will read hundreds of these today, most of them trying to win you over.',
  'This one simply wants to thank you for staying with each of them anyway.',
  '',
  'No one thanks the reader. Thank you for the attention you give to',
  "strangers' sentences, for weighing each one fairly on its own,",
  'for doing the quiet work of this strange contest.',
  '',
  'Picture a quiet queue, each line waiting its turn, none of them rushed past.',
  'That steady attention is what you bring here.',
].join('\n');

// The competition's gate: UTF-8 text of 1 to 1000 characters, not only
// white space. Check here so a bad edit fails loudly instead of silently
// shipping an entry the judge never sees.
const characters = [...ENTRY_TEXT].length;
if (characters < 1 || characters > 1000) {
  throw new Error(`entry is ${characters} characters, the gate allows 1 to 1000`);
}
if (ENTRY_TEXT.trim().length === 0) {
  throw new Error('entry is only white space');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY_TEXT, 'utf8');
console.log(`wrote entry.txt (${characters} characters)`);
