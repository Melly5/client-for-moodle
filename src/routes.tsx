import { FolderPage } from "./components/Folder/FolderPage";
import { CoursePage } from "./pages/CoursePage/CoursePage";
import { Courses } from "./pages/CoursesList/Courses";
import { Login } from "./pages/Login";
import {
  MAIN_ROUTE,
  LOGIN_ROUTE,
  COURSE_ROUTE,
  FOLDER_ROUTE,
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
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
