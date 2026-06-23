# @ravisiontech/iris

Typed client for the [Iris](https://iris.ravisiontech.com) content API. Iris is a
headless, multi-tenant CMS; this package gives a site a small, type-safe way to read its
content without touching anything Payload-specific.

## Install

```bash
pnpm add @ravisiontech/iris
```

## Usage

```ts
import { createIris } from "@ravisiontech/iris";

const iris = createIris({ apiKey: process.env.IRIS_KEY! });

const home = await iris.pages.bySlug("home");
const all = await iris.pages.list();
```

Pass `baseUrl` to target a local Iris during development:

```ts
const iris = createIris({
  apiKey: process.env.IRIS_KEY!,
  baseUrl: "http://localhost:3000",
});
```

Requests are scoped to the property the API key belongs to, so `pages.list()` only ever
returns that property's pages.

## Rendering content

A page's `content` is an array of blocks, each discriminated by `blockType`. Use
`getBlocks` to iterate and narrow each block to its concrete shape:

```ts
import { getBlocks, type Page } from "@ravisiontech/iris";

function render(page: Page) {
  return getBlocks(page).map((block) => {
    switch (block.blockType) {
      case "hero":
        return block.heading; // typed as the hero block
      case "faq":
        return block.items;
      default:
        return null;
    }
  });
}
```

`BlockOfType<"hero">` narrows to a single block type when you want per-block components.

## API

| Method | Returns |
| --- | --- |
| `iris.pages.list(opts?)` | `Paginated<Page>` |
| `iris.pages.bySlug(slug, opts?)` | `Page \| null` |
| `iris.pages.byId(id, opts?)` | `Page` |
| `iris.media.byId(id, opts?)` | `Media` |
| `iris.raw.get(path, params?)` | raw JSON (escape hatch) |

`opts` accepts `depth`, `limit`, `page`, `sort`, `where`, and `draft`. Failed requests
throw an `IrisError` carrying the response `status` and `body`.

## Types

The exported types (`Page`, `Media`, block unions) are generated from the Iris schema and
kept in sync with `pnpm sync:types`. Don't edit `src/payload-types.ts` by hand.
