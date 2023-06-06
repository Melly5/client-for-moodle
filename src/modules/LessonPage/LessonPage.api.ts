import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";
import { Lesson } from "./LessonPage.types";

export interface LessonProps {
  lessonid: number;
  startpageid: number;
}

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLessonPageContent: build.query<Lesson, LessonProps>({
      query: (args) => {
        const { lessonid, startpageid } = args;
        return {
          url: `${apiUrls.lessonPageContentUrl}&lessonid=${lessonid}&pageid=${startpageid}`,
          method: "GET",
        };
      },
    }),
    getLessonStartPageContent: build.query<any, number>({
      query: (id) => {
        console.log(id);
        return {
          url: `${apiUrls.lessonStartPageContentUrl}&lessonid=${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        console.log(response);
        response.pages[0].page.id;
      },
    }),
  }),
});

export const {
  useGetLessonPageContentQuery,
  useLazyGetLessonStartPageContentQuery,
  endpoints: { getLessonPageContent, getLessonStartPageContent },
} = productApi;
