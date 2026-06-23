import type { HttpClient } from "./client";
import type { Page, Media, Paginated, QueryOptions } from "./types";

const DEFAULT_DEPTH = 2;

/** Read access to the pages of the authenticated property. */
export class PagesResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Lists pages belonging to the property tied to the API key. Results are
   * scoped to that property automatically as there is no cross-tenant access.
   */
  list(opts: QueryOptions = {}): Promise<Paginated<Page>> {
    const { depth = DEFAULT_DEPTH, ...rest } = opts;
    return this.http.get<Paginated<Page>>("/pages", { depth, ...rest });
  }

  /**
   * Fetches a single page by its slug.
   *
   * @returns The matching page, or `null` when no page has that slug.
   */
  async bySlug(slug: string, opts: QueryOptions = {}): Promise<Page | null> {
    const { depth = DEFAULT_DEPTH, where, ...rest } = opts;
    const result = await this.http.get<Paginated<Page>>("/pages", {
      ...rest,
      depth,
      limit: 1,
      where: { slug: { equals: slug }, ...where },
    });
    return result.docs[0] ?? null;
  }

  /** Fetches a single page by its id. */
  byId(id: number | string, opts: QueryOptions = {}): Promise<Page> {
    const { depth = DEFAULT_DEPTH } = opts;
    return this.http.get<Page>(`/pages/${id}`, { depth });
  }
}

/** Read access to media items and their resolved public URLs. */
export class MediaResource {
  constructor(private readonly http: HttpClient) {}

  /** Fetches a single media item by its id. */
  byId(id: number | string, opts: QueryOptions = {}): Promise<Media> {
    const { depth = 0 } = opts;
    return this.http.get<Media>(`/media/${id}`, { depth });
  }
}
