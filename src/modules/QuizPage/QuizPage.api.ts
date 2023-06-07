import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";
import {
  QuizAccessInfo,
  QuizAttemptData,
  QuizStartAttempt,
} from "./QuizPage.types";

export interface QuizAttemptProps {
  attemptid: number;
  page: number;
}

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizAccessInformation: build.query<QuizAccessInfo, number>({
      query: (id) => {
        return {
          url: `${apiUrls.quizAccessInfoUrl}&quizid=${id}`,
          method: "GET",
        };
      },
    }),
    getQuizStartAttempt: build.query<QuizStartAttempt, number>({
      query: (id) => {
        return {
          url: `${apiUrls.quizStartAttemptUrl}&quizid=${id}`,
          method: "GET",
        };
      },
    }),
    getQuizAttemptData: build.query<QuizAttemptData, QuizAttemptProps>({
      query: ({ attemptid, page }) => {
        return {
          url: `${apiUrls.quizAttemptDataUrl}&attemptid=${attemptid}&page=${page}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetQuizAccessInformationQuery,
  useGetQuizAttemptDataQuery,
  useLazyGetQuizStartAttemptQuery,
  endpoints: {
    getQuizAccessInformation,
    getQuizStartAttempt,
    getQuizAttemptData,
  },
} = productApi;
