import { ofetch } from "ofetch";
import { offlineAwareFetch } from "@/lib/offline/fetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = ofetch.create(
  {
    baseURL: BASE_URL,
    credentials: "include",
  },
  {
    fetch: offlineAwareFetch,
  },
);

export default apiClient;
