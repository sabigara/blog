import { env } from "@/env";

export type PaApiProxyItemResponse = {
  asin: string;
  image: {
    height: number;
    url: string;
    width: number;
  };
  price: string;
  title: string;
  url: string;
};

type Params = {
  asin: string;
};

export async function fetchAmazonItem({
  asin,
}: Params): Promise<PaApiProxyItemResponse> {
  const search = new URLSearchParams({
    apiKey: env.PAAPI_PROXY_API_KEY,
    asin,
  }).toString();

  const res = await fetch(env.PAAPI_PROXY_URL + "/api/items" + "?" + search);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${env.PAAPI_PROXY_URL}. Status: ${
        res.status
      }. Body: ${await res.text()}`
    );
  }
  return res.json();
}
