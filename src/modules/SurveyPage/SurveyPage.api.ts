import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";

import { SurveyContent } from "./SurveyPage.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSurveyContent: build.query<SurveyContent[], number>({
      query: (id) => {
        return {
          url: `${apiUrls.surveyContentUrl}&surveyid=${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.questions,
    }),
  }),
});

export const {
  useGetSurveyContentQuery,
  endpoints: { getSurveyContent },
} = productApi;
