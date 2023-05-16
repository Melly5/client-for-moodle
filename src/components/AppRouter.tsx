import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

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
    </Routes>
  );
};
