import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";

import { ForumDiscussion } from "./ForumPage.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getForumDiscussions: build.query<ForumDiscussion[], number>({
      query: (id) => {
        return {
          url: `${apiUrls.forumDiscussionsUrl}&forumid=${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.discussions,
    }),
  }),
});

export const {
  useGetForumDiscussionsQuery,
  endpoints: { getForumDiscussions },
} = productApi;
