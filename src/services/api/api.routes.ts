import { AssignPage } from "modules/AssignPage/AssignPage.module";
import { FolderPage } from "modules/FolderPage/FolderPage.module";
import { ForumPage } from "modules/ForumPage/ForumPage.module";
import { LessonPage } from "modules/LessonPage/LessonPage.module";
import { QuizPage } from "modules/QuizPage/QuizPage.module";
import { ResourcePage } from "modules/ResourcePage/ResourcePage.module";
import { CoursePage } from "modules/CoursePage/CoursePage.module";
import ForumDiscussion from "modules/CoursePage/components/moduleItems/Discussion/Discussion.component";
import { WebpagePage } from "modules/WebpagePage/WebpagePage.module";
import { Login } from "modules/Login.module";

import {
  LOGIN_ROUTE,
  COURSE_ROUTE,
  FOLDER_ROUTE,
  FORUM_ROUTE,
  ASSIGN_ROUTE,
  QUIZ_ROUTE,
  LESSON_ROUTE,
  RESOURCE_ROUTE,
  DISCUSSION_ROUTE,
  PAGE_ROUTE,
} from "./api.constants";

export const authRoutes = [
  {
    path: COURSE_ROUTE,
    Component: CoursePage,
  },
  {
    path: FOLDER_ROUTE,
    Component: FolderPage,
  },
  {
    path: FORUM_ROUTE,
    Component: ForumPage,
  },
  {
    path: DISCUSSION_ROUTE,
    Component: ForumDiscussion,
  },
  {
    path: ASSIGN_ROUTE,
    Component: AssignPage,
  },
  {
    path: QUIZ_ROUTE,
    Component: QuizPage,
  },
  {
    path: LESSON_ROUTE,
    Component: LessonPage,
  },
  {
    path: RESOURCE_ROUTE,
    Component: ResourcePage,
  },
  {
    path: PAGE_ROUTE,
    Component: WebpagePage,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
