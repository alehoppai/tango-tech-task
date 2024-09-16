import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET } from "./fetch";

describe("fetch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("GET function should construct the correct URL with search params", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });
    global.fetch = mockFetch;

    const search = { term: "test", limit: "5" };
    await GET(search);

    expect(mockFetch).toHaveBeenCalledWith(expect.any(URL), {
      headers: {
        Accept: "application/json",
      },
    });

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl.toString()).toBe(
      "https://icanhazdadjoke.com/search?term=test&limit=5"
    );
  });

  test("GET function should make a fetch request with correct headers", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });
    global.fetch = mockFetch;

    await GET({});

    expect(mockFetch).toHaveBeenCalledWith(expect.any(URL), {
      headers: {
        Accept: "application/json",
      },
    });

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl.toString()).toBe("https://icanhazdadjoke.com/search");
  });

  test("GET function should return the fetch response", async () => {
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({ results: [{ id: "1", joke: "Test joke" }] }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await GET({});

    expect(result).toEqual(await mockResponse.json());
  });

  test("GET function should return the error response for non-ok responses", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: () => Promise.resolve({ error: "Not Found" }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const response = await GET({});

    expect(response).toEqual({ error: "Not Found" });
  });
});
