import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";
import { WebpageContent } from "./WebpagePage.types";

export interface WebpageProps {
  webpageid: number;
  courseid: number;
}

const getPageContent = (data: WebpageContent[], id: number) => {
  return data.find((item: WebpageContent) => item.id === id);
};

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWebpageContent: build.query<WebpageContent, WebpageProps>({
      query: ({ courseid }) => {
        return {
          url: `${apiUrls.webpageContentUrl}&courseids[0]=${courseid}`,
          method: "GET",
        };
      },
      transformResponse: (response, meta, { webpageid }) => {
        return getPageContent(response.pages, webpageid);
      },
    }),
  }),
});

export const {
  useGetWebpageContentQuery,
  endpoints: { getWebpageContent },
} = productApi;
