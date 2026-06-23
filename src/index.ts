import { HttpClient, type IrisClientOptions } from "./client";
import { MediaResource, PagesResource } from "./resources";

/** Typed client for the Iris content API. Create one with {@link createIris}. */
export class IrisClient {
  /** Read pages for the authenticated property. */
  readonly pages: PagesResource;
  /** Read media items for the authenticated property. */
  readonly media: MediaResource;
  /** Low-level HTTP access for endpoints the helpers above don't cover. */
  readonly raw: HttpClient;

  constructor(opts: IrisClientOptions) {
    this.raw = new HttpClient(opts);
    this.pages = new PagesResource(this.raw);
    this.media = new MediaResource(this.raw);
  }
}

/**
 * Creates an Iris client.
 *
 * @example
 * const iris = createIris({ apiKey: process.env.IRIS_KEY });
 * const home = await iris.pages.bySlug("home");
 */
export function createIris(opts: IrisClientOptions): IrisClient {
  return new IrisClient(opts);
}

export { IrisError } from "./client";
export type { IrisClientOptions } from "./client";
export * from "./types";
