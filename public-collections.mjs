/**
 * Single source of truth for which Iris collections this package
 * exposes.
 *
 * The type sync (scripts/sync-types.mjs) extracts exactly these
 * interfaces from the Iris schema and bundles their types. To expose
 * another collection, add it here and give it a resource in src/resources.ts.
 */
export const PUBLIC_COLLECTIONS = ["Property", "Page", "Media"];
