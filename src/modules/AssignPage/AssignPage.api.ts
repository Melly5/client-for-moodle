import { baseApi } from "../../services/api/api.service";

import { apiUrls } from "../../utils/apiUrls";
import { Assignment, Submission, SubmissionStatus } from "./AssignPage.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAssignments: build.query<Assignment[], number>({
      query: (id) => {
        return {
          url: `${apiUrls.allAssignmentsUrl}&courseids[0]=${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.courses[0].assignments,
    }),
    getAllSubmissions: build.query<Submission, number>({
      query: (id) => {
        return {
          url: `${apiUrls.allSubmissionsUrl}&assignmentids[0]=${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.assignments[0].submissions[0],
    }),
    getSubmissionStatus: build.query<SubmissionStatus, number>({
      query: (id) => {
        return {
          url: `${apiUrls.submissionStatusUrl}&assignid=${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.feedback,
    }),
  }),
});

export const {
  useGetAllAssignmentsQuery,
  useGetAllSubmissionsQuery,
  useGetSubmissionStatusQuery,
  endpoints: { getAllAssignments, getAllSubmissions, getSubmissionStatus },
} = productApi;
