import { lazy } from "react";

export const ScannerForm = lazy(() => {
  return import(
    /* webpackChunkName: "CoursesListPage" */ "./Courses.module"
  ).then((m) => ({
    default: m.Courses,
  }));
});
