import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";

import { UrlContent } from "./UrlPage.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUrlInfo: build.query<UrlContent[], number>({
      query: (id) => {
        return {
          url: `${apiUrls.urlInfoUrl}&courseids[0]=${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.urls,
    }),
  }),
});

export const {
  useGetUrlInfoQuery,
  endpoints: { getUrlInfo },
} = productApi;
