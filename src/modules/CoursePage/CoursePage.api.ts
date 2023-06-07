import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";

import { CourseInfo } from "./CoursePage.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourseInfo: build.query<CourseInfo[], number>({
      query: (id) => {
        return {
          url: `${apiUrls.courseContentUrl}&courseid=${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetCourseInfoQuery,
  endpoints: { getCourseInfo },
} = productApi;
