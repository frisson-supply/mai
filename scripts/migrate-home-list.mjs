// One-off migration: homeGrid (grid-positioned items) -> homeList (plain list).
// Sanity document _id/_type can't be patched in place, so this creates a new
// `homeList` document and deletes the old `homeGrid` one in a single transaction.
//
// Usage:
//   node --env-file=.env scripts/migrate-home-list.mjs            # dry run (default)
//   node --env-file=.env scripts/migrate-home-list.mjs --apply    # actually writes

import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");

const client = createClient({
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: apply
        ? process.env.SANITY_API_WRITE_TOKEN
        : process.env.SANITY_API_READ_TOKEN,
});

if (apply && !process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
        "SANITY_API_WRITE_TOKEN is required to apply this migration. Add it to .env and re-run with --apply.",
    );
    process.exit(1);
}

const oldDoc = await client.fetch(`*[_type == "homeGrid" && _id == "homeGrid"][0]`);

if (!oldDoc) {
    console.log("No homeGrid document found — nothing to migrate.");
    process.exit(0);
}

const newDoc = {
    _id: "homeList",
    _type: "homeList",
    items: (oldDoc.items ?? []).map((item) => ({
        _key: item._key,
        _type: "listItem",
        project: item.project,
    })),
};

console.log(apply ? "Applying migration:" : "Dry run — would apply:");
console.log(JSON.stringify(newDoc, null, 2));
console.log(`(and delete document "homeGrid")`);

if (!apply) {
    console.log("\nRe-run with --apply to write this.");
    process.exit(0);
}

await client
    .transaction()
    .createOrReplace(newDoc)
    .delete("homeGrid")
    .commit();

console.log("Migration applied.");
