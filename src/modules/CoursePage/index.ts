import { lazy } from "react";

export const ScannerForm = lazy(() => {
  return import(
    /* webpackChunkName: "CoursePage" */ "./CoursePage.module"
  ).then((m) => ({
    default: m.CoursePage,
  }));
});
