import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  QuizAccessInfo,
  QuizAttemptData,
  QuizStartAttempt,
} from "../../modules/QuizPage/QuizPage.types";
import { Course, CourseInfo } from "../../modules/CoursePage/CoursePage.types";
import { UrlContent } from "../../modules/UrlPage/UrlPage.types";
import { SurveyContent } from "../../modules/SurveyPage/SurveyPage.types";
import { ForumDiscussion } from "../../modules/ForumPage/ForumPage.types";

const token = "2b8e54a638f0422b6859f223fa0a086e";
const API = `/server.php?wstoken=${token}&moodlewsrestformat=json&wsfunction=`;
const API_URL = `https://dev.online.tusur.ru/moodle/webservice/rest`;

const allCoursesUrl = `${API}core_course_get_courses`;
const courseContentUrl = `${API}core_course_get_contents`;
const allAssignmentsUrl = `${API}mod_assign_get_assignments`;
const allSubmissionsUrl = `${API}mod_assign_get_submissions`;
const submissionStatusUrl = `${API}mod_assign_get_submission_status`;
const forumDiscussionsUrl = `${API}mod_forum_get_forum_discussions`;
const lessonPageContentUrl = `${API}mod_lesson_get_page_data`;
const webpageContentUrl = `${API}mod_page_get_pages_by_courses`;
const quizAccessInfoUrl = `${API}mod_quiz_get_quiz_access_information`;
const quizAttemptDataUrl = `${API}mod_quiz_get_attempt_data`;
const quizStartAttemptUrl = `${API}mod_quiz_start_attempt`;
const urlInfoUrl = `${API}mod_url_get_urls_by_courses`;
const surveyContentUrl = `${API}mod_survey_get_questions`;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => allCoursesUrl,
    }),
    getCourseInfo: builder.query<CourseInfo[], number>({
      query: (id) => ({ url: `${courseContentUrl}&courseid=${id}` }),
    }),
    getAllAssignments: builder.query<Assignment[], number>({
      query: (id) => ({ url: `${allAssignmentsUrl}&courseids[0]=${id}` }),
      transformResponse: (response) => response.courses[0].assignments,
    }),
    getAllSubmissions: builder.query<Submission, number>({
      query: (id) => ({ url: `${allSubmissionsUrl}&assignmentids[0]=${id}` }),
      transformResponse: (response) => response.assignments[0].submissions[0],
    }),
    getSubmissionStatus: builder.query<SubmissionStatus, number>({
      query: (id) => ({ url: `${submissionStatusUrl}&assignid=${id}` }),
      transformResponse: (response) => response.feedback,
    }),
    getForumDiscussions: builder.query<ForumDiscussion[], number>({
      query: (id) => ({ url: `${forumDiscussionsUrl}&forumid=${id}` }),
      transformResponse: (response) => response.discussions,
    }),
    getLessonPageContent: builder.query<LessonI, LessonProps>({
      query: (args) => {
        const { lessonid, startpageid } = args;
        return {
          url: `${lessonPageContentUrl}&lessonid=${lessonid}&pageid=${startpageid}`,
        };
      },
    }),
    getWebpageContent: builder.query<PageContent, number>({
      query: (courseid) => {
        return { url: `${webpageContentUrl}&courseids[0]=${courseid}` };
      },
      transformResponse: (response) => response.pages as PageContent,
    }),
    getQuizAccessInformation: builder.query<QuizAccessInfo, number>({
      query: (id) => ({ url: `${quizAccessInfoUrl}&quizid=${id}` }),
    }),
    getQuizStartAttempt: builder.query<QuizStartAttempt, number>({
      query: (id) => ({ url: `${quizStartAttemptUrl}&quizid=${id}` }),
    }),
    getQuizAttemptData: builder.query<QuizAttemptData, QuizAttemptProps>({
      query: (args) => {
        const { attemptid, page } = args;
        return {
          url: `${quizAttemptDataUrl}&attemptid=${attemptid}&page=${page}`,
        };
      },
    }),
    getUrlInfo: builder.query<UrlContent[], number>({
      query: (id) => ({ url: `${urlInfoUrl}&courseids[0]=${id}` }),
      transformResponse: (response) => response.urls,
    }),
    getSurveyContent: builder.query<SurveyContent[], number>({
      query: (id) => ({ url: `${surveyContentUrl}&surveyid=${id}` }),
      transformResponse: (response) => response.questions,
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseInfoQuery,
  useGetAllAssignmentsQuery,
  useGetAllSubmissionsQuery,
  useGetForumDiscussionsQuery,
  useGetLessonPageContentQuery,
  useGetSubmissionStatusQuery,
  useGetWebpageContentQuery,
  useGetQuizAccessInformationQuery,
  useGetQuizAttemptDataQuery,
  useGetQuizStartAttemptQuery,
  useGetUrlInfoQuery,
  useGetSurveyContentQuery,
} = baseApi;

export interface LessonProps {
  lessonid: number;
  startpageid: number;
}

export interface QuizAttemptProps {
  attemptid: number;
  page: number;
}

export interface webpageProps {
  courseid: string;
  lessonid: number;
}
