import { baseApi } from "../../../services/api/api.service";

import { apiUrls } from "../../../utils/apiUrls";

export interface QuizSaveAttemptDataProps {
  attemptid: number;
  questionid: number;
  name: string;
  value: string;
}

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizSaveAttemptData: build.query<any, QuizSaveAttemptDataProps>({
      query: ({ attemptid, questionid, name, value }) => {
        return {
          url: `${apiUrls.quizSaveAttemptUrl}&attemptid=${attemptid}&data[${questionid}][name]=${name}&data[${questionid}][value]=${value}`,
          method: "GET",
        };
      },
    }),
    getQuizProcessAttempt: build.query<any, any>({
      query: ({ attemptid, questionid, name, value }) => {
        return {
          url: `${apiUrls.quizFinishAttemptUrl}&finishattempt=0&attemptid=${attemptid}&data[${questionid}][name]=${name}&data[${questionid}][value]=${value}`,
          method: "GET",
        };
      },
    }),
    getQuizFinishAttempt: build.query<any, any>({
      query: ({ attemptid, questionid, name, value }) => {
        return {
          url: `${apiUrls.quizFinishAttemptUrl}&finishattempt=1&attemptid=${attemptid}&data[${questionid}][name]=${name}&data[${questionid}][value]=${value}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLazyGetQuizSaveAttemptDataQuery,
  useLazyGetQuizProcessAttemptQuery,
  useLazyGetQuizFinishAttemptQuery,
  endpoints: { getQuizSaveAttemptData },
} = productApi;
