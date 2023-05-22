import { AssignPage } from "./pages/AssignPage/AssignPage";
import { FolderPage } from "./pages/FolderPage/FolderPage";
import { ForumPage } from "./pages/ForumPage/ForumPage";
import { LessonPage } from "./pages/LessonPage/LessonPage";
import { QuizPage } from "./pages/QuizPage/QuizPage";
import { ResourcePage } from "./pages/ResourcePage/ResourcePage";
import { CoursePage } from "./pages/CoursePage/CoursePage";
import { Courses } from "./pages/CoursesList/Courses";
import { Login } from "./pages/Login";
import {
  MAIN_ROUTE,
  LOGIN_ROUTE,
  COURSE_ROUTE,
  FOLDER_ROUTE,
  FORUM_ROUTE,
  ASSIGN_ROUTE,
  QUIZ_ROUTE,
  LESSON_ROUTE,
  RESOURCE_ROUTE,
} from "./utils/consts";

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
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
