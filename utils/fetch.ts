const API_URL = "https://icanhazdadjoke.com/search";

export const GET = async <T>(search: Record<string, string>) => {
  const url = new URL(API_URL);

  Object.entries(search).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  return (await response.json()) as T;
};
