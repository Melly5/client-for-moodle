import { FolderPage } from "./components/Folder/FolderPage";
import { ForumPage } from "./components/Forum/ForumPage";
import { CoursePage } from "./pages/CoursePage/CoursePage";
import { Courses } from "./pages/CoursesList/Courses";
import { Login } from "./pages/Login";
import {
  MAIN_ROUTE,
  LOGIN_ROUTE,
  COURSE_ROUTE,
  FOLDER_ROUTE,
  FORUM_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Courses,
  },
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
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
