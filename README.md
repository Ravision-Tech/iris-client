# @ravisiontech/iris

The official client for reading your content from the [Iris](https://iris.ravisiontech.com)
platform. Iris is where your site's content is managed and edited; this package lets your
site fetch that content and render it however you like, with full TypeScript types.

## Install

```bash
npm install @ravisiontech/iris
# or
pnpm add @ravisiontech/iris
# or
yarn add @ravisiontech/iris
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

| Method                           | Returns                 |
| -------------------------------- | ----------------------- |
| `iris.pages.list(opts?)`         | `Paginated<Page>`       |
| `iris.pages.bySlug(slug, opts?)` | `Page \| null`          |
| `iris.pages.byId(id, opts?)`     | `Page`                  |
| `iris.media.byId(id, opts?)`     | `Media`                 |
| `iris.raw.get(path, params?)`    | raw JSON (escape hatch) |

`opts` accepts `depth`, `limit`, `page`, `sort`, `where`, and `draft`. Failed requests
throw an `IrisError` carrying the response `status` and `body`.

## Types

Every type you need ships with the package. Import `Page`, `Media`, and the block unions
(`PageBlock`, `BlockOfType`) directly:

```ts
import type { Media, Page, PageBlock } from "@ravisiontech/iris";
```

They always reflect the content types set up in your Iris platform, so your editor
autocompletes real fields and flags typos before you ship.
