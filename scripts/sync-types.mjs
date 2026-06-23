import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

import { PUBLIC_COLLECTIONS } from "../public-collections.mjs";

// Pulls the generated content types from the Iris backend, keeping only the
// public collections (see ../public-collections.mjs). Page and Media reference
// Property and nothing else, so this is the full public set — every other
// (non-public) part of the schema is left out and never reaches the published
// package or this repo.
const PUBLIC_INTERFACES = new Set(PUBLIC_COLLECTIONS);

const source = new URL("../../Iris/src/payload-types.ts", import.meta.url);
const output = new URL("../src/schema.ts", import.meta.url);

const header = ["/* eslint-disable */"];

const lines = readFileSync(source, "utf8").split("\n");
const out = [...header];
let capturing = false;

for (const line of lines) {
  if (capturing) {
    out.push(line);
    // Top-level interfaces close with a `}` in the first column; nested braces
    // are always indented, so this reliably ends the current interface.
    if (line === "}") {
      capturing = false;
      out.push("");
    }
    continue;
  }

  const match = line.match(/^export interface (\w+)/);
  if (match && PUBLIC_INTERFACES.has(match[1])) {
    capturing = true;
    out.push(line);
  }
}

const found = [...out.join("\n").matchAll(/^export interface (\w+)/gm)].map((m) => m[1]);
const missing = [...PUBLIC_INTERFACES].filter((name) => !found.includes(name));
if (missing.length > 0) {
  console.error(`✖ sync:types could not find these interfaces in the Iris schema: ${missing.join(", ")}`);
  process.exit(1);
}

mkdirSync(new URL("../src/", import.meta.url), { recursive: true });
writeFileSync(output, `${out.join("\n").replace(/\n+$/, "")}\n`);

console.log(`✓ Synced public types: ${found.join(", ")}`);
