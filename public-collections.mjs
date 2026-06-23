// Single source of truth for which Iris collections the package exposes.
//
// The type sync (scripts/sync-types.mjs) extracts exactly these interfaces from
// the Iris schema, and the publish guard (scripts/check-dist.mjs) allows exactly
// these as public type exports. To expose a new collection, add it here (and
// give it a resource in src/resources.ts) — there is nowhere else to update.
export const PUBLIC_COLLECTIONS = ["Property", "Page", "Media"];
