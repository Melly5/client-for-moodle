import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";
import { Course } from "../CoursePage/CoursePage.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query<Course[], void>({
      query: () => {
        return {
          url: apiUrls.allCoursesUrl,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetCoursesQuery,
  endpoints: { getCourses },
} = productApi;
