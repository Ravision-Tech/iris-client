import type { Media, Page, Property } from "./schema";

export type { Page, Media, Property };

/**
 * A single block within a page's content. This is the union of every block
 * type configured in Iris, discriminated by its `blockType`.
 */
export type PageBlock = NonNullable<Page["content"]>[number];

/** Every available `blockType` value, e.g. `"hero" | "faq" | "pricing"`. */
export type BlockType = PageBlock["blockType"];

/**
 * Narrows {@link PageBlock} down to a single block by its type.
 *
 * @example
 * function Hero(block: BlockOfType<"hero">) {
 *   return block.heading;
 * }
 */
export type BlockOfType<T extends BlockType> = Extract<PageBlock, { blockType: T }>;

/**
 * Returns a page's blocks as an array, falling back to an empty array when the
 * page has no content yet. Handy for iterating without a null check.
 */
export function getBlocks(page: Page): PageBlock[] {
  return page.content ?? [];
}

/** A paginated list response from the Iris API. */
export interface Paginated<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

/** Query parameters accepted by the read methods. */
export interface QueryOptions {
  /** How deep to resolve relationships such as media and linked documents. */
  depth?: number;
  /** Maximum number of documents to return. */
  limit?: number;
  /** Page number, starting at 1. */
  page?: number;
  /** Sort field; prefix with `-` for descending, e.g. `"-createdAt"`. */
  sort?: string;
  /** Additional `where` filters to narrow results, merged with any the method sets itself. */
  where?: Record<string, unknown>;
  /** Whether to include draft versions. */
  draft?: boolean;
}
