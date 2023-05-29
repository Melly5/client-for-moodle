import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../utils/api/constants/routes";
import { Courses } from "../pages/CoursesList/Courses";
import { PageLayout } from "./PageLayout";

export const AppRouter = () => {
  const authRouteComponents = authRoutes.map(({ path, Component }) => (
    <Route
      path={path}
      element={
        <PageLayout>
          <Component />
        </PageLayout>
      }
      key={path}
    />
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
