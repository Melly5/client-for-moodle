import { Routes, Route } from "react-router-dom";

import { Courses } from "../../modules/CoursesList/Courses.module";
import { PageLayout } from "../PageLayout/PageLayout";
import { authRoutes, publicRoutes } from "../../services/api/api.routes";

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
