import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Courses } from "../pages/CoursesList/Courses";

export const AppRouter = () => {
  const authRouteComponents = authRoutes.map(({ path, Component }) => (
    <Route path={path} element={<Component />} key={path} />
  ));
  const publicRouteComponents = publicRoutes.map(({ path, Component }) => (
    <Route path={path} element={<Component />} key={path} />
  ));

  return (
    <Routes>
      {authRouteComponents}
      {publicRouteComponents}
      <Route path="*" element={<Courses />} />
    </Routes>
  );
};
