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
  }),
});

export const {
  useGetLessonPageContentQuery,
  endpoints: { getLessonPageContent },
} = productApi;
