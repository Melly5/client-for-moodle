import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";
import { WebpageContent } from "./WebpagePage.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWebpageContent: build.query<WebpageContent, number>({
      query: (id) => {
        return {
          url: `${apiUrls.webpageContentUrl}&courseids[0]=${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.pages as WebpageContent,
    }),
  }),
});

export const {
  useGetWebpageContentQuery,
  endpoints: { getWebpageContent },
} = productApi;
