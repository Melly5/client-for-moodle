import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      transformResponse: (response: Webpage) => response.pages as PageContent,
    }),
    getQuizAccessInformation: builder.query<QuizAccessInformation, number>({
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

export interface Course {
  id: number;
  fullname: string;
}

export interface CourseInfo {
  id: number;
  name: string;
  modules: [];
}

export interface Assignment {
  id: number;
  cmid: number;
  course: number;
  name: string;
  configs: [];
  introattachments: [];
  activity: string;
  intro: string;
  duedate: number;
  allowsubmissionsfromdate: number;
}

export interface File {
  filename: string;
  filepath: string;
  filesize: number;
  fileurl: string;
  isexternalfile: boolean;
  mimetype: string;
  timemodified: number;
}

export interface Submission {
  gradingstatus: string;
  plugins: Plugin[];
}
export interface Plugin {
  type: string;
  fileareas: [
    {
      files: File[];
    }
  ];
}
export interface SubmissionStatus {
  gradefordisplay: string;
  gradeddate: number;
  plugins: [
    {
      editorfields: [
        {
          description: string;
          text: string;
        }
      ];
    }
  ];
}

export interface LessonProps {
  lessonid: number;
  startpageid: number;
}
export interface Discussions {
  discussions: [];
}
export interface ForumDiscussion {
  id: number;
  name: string;
  userfullname: string;
  created: number;
  usermodifiedfullname: string;
  timemodified: number;
  numreplies: number;
}

export interface LessonPageI {
  id: number;
  lessonid: number;
  prevpageid: number;
  nextpageid: number;
  qtype: number;
  qoption: number;
  timecreated: number;
  timemodified: number;
  title: string;
  contents: string;
  type: number;
  typeid: number;
  typestring: string;
}
export interface LessonPageAnswersI {
  id: number;
  answerfiles: [];
  responsefiles: [];
  jumpto: number;
  grade: number;
  score: number;
  flags: number;
  timecreated: number;
  timemodified: number;
  answer: string;
  answerformat: number;
  response: string;
  responseformat: number;
}

export interface LessonI {
  page: LessonPageI;
  answers: LessonPageAnswersI[];
}

export interface Webpage {
  pages: PageContent;
}

export interface webpageProps {
  courseid: string;
  lessonid: number;
}

export interface PageContent {
  id: number;
  name: string;
  timemodified: number;
  content: string;
}

export interface QuizAttemptProps {
  attemptid: number;
  page: number;
}

export interface QuizAccessInformation {
  accessrules: string[];
}
export interface QuizStartAttempt {
  attempt: { id: number; currentpage: number };
}
export interface QuizAttemptData {
  attempt: { id: number; currentpage: number };
  nextpage: number;
  questions: {
    type: string;
    page: number;
    html: string;
    status: string;
    maxmark: number;
  };
}

export interface UrlContent {
  id: number;
  name: string;
  externalurl: string;
}

export interface SurveyContent {
  id: number;
  text: string;
  type: number;
}
