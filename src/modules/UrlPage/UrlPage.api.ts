import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";

import { UrlContent } from "./UrlPage.types";

export interface UrlProps {
  urlid: number;
  courseid: number;
}

const getUrl = (data: UrlContent[], id: number) => {
  return data.find((item: UrlContent) => item.id === id);
};

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUrlInfo: build.query<UrlContent[], UrlProps>({
      query: ({ courseid }) => {
        return {
          url: `${apiUrls.urlInfoUrl}&courseids[0]=${courseid}`,
          method: "GET",
        };
      },
      transformResponse: (response, meta, { urlid }) => {
        return getUrl(response.urls, urlid);
      },
    }),
  }),
});

export const {
  useGetUrlInfoQuery,
  endpoints: { getUrlInfo },
} = productApi;
