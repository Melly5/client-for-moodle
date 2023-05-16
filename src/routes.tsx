import { Courses } from "./components/Courses";
import { Auth } from "./pages/Auth";
import { MAIN_ROUTE, LOGIN_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
      path: MAIN_ROUTE,
      Component: Courses
    },
]

export const publicRoutes = [
    {
      path: LOGIN_ROUTE,
      Component: Auth  
    },
]