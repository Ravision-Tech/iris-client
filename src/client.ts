const DEFAULT_BASE_URL = "https://iris.ravisiontech.com";

/** Configuration for {@link createIris}. */
export interface IrisClientOptions {
  /** API key for the property whose content you want to read. */
  apiKey: string;
  /**
   * Base URL of the Iris server. Defaults to the hosted instance; point this at
   * `http://localhost:3000` when developing against a local Iris.
   */
  baseUrl?: string;
  /** Auth collection the API key belongs to. Defaults to `"users"`. */
  collection?: string;
  /** Custom `fetch` implementation. Defaults to the global `fetch`. */
  fetch?: typeof fetch;
}

/** Thrown when the Iris API responds with a non-2xx status. */
export class IrisError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: unknown,
  ) {
    super(message);
    this.name = "IrisError";
  }
}

// Serialises params into Payload's bracket notation, e.g.
// { where: { slug: { equals: "home" } }, depth: 2 } -> where[slug][equals]=home&depth=2
function encodeQuery(params: Record<string, unknown>): string {
  const parts: string[] = [];

  const add = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item, index) => add(`${key}[${index}]`, item));
    } else if (typeof value === "object") {
      for (const [k, v] of Object.entries(value)) add(`${key}[${k}]`, v);
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  };

  for (const [key, value] of Object.entries(params)) add(key, value);

  return parts.join("&");
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly authHeader: string;
  private readonly fetchImpl: typeof fetch;

  constructor(opts: IrisClientOptions) {
    if (!opts.apiKey) {
      throw new Error("IrisClient: apiKey is required.");
    }

    this.baseUrl = (opts.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.authHeader = `${opts.collection ?? "users"} API-Key ${opts.apiKey}`;
    this.fetchImpl = opts.fetch ?? globalThis.fetch;

    if (!this.fetchImpl) {
      throw new Error("IrisClient: no fetch implementation found. Pass `fetch` or run on Node 18+.");
    }
  }

  /**
   * Sends a GET request to the Iris REST API and returns the parsed JSON body.
   * Prefer the typed `pages` and `media` helpers; reach for this only for
   * endpoints they don't yet cover.
   *
   * @param path Path beneath `/api`, e.g. `"/pages"`.
   * @param params Query parameters, encoded in Payload's bracket notation.
   * @throws {IrisError} When the response status is not 2xx.
   */
  async get<T>(path: string, params: Record<string, unknown> = {}): Promise<T> {
    const query = encodeQuery(params);
    const url = `${this.baseUrl}/api${path}${query ? `?${query}` : ""}`;

    const response = await this.fetchImpl(url, {
      headers: {
        Authorization: this.authHeader,
        "Content-Type": "application/json",
      },
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        (body as { errors?: { message?: string }[] } | null)?.errors?.[0]?.message ??
        `Iris request failed with status ${response.status}.`;
      throw new IrisError(message, response.status, body);
    }

    return body as T;
  }
}
