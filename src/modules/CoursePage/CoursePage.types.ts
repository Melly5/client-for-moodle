import { Date } from "../../shared/types/types";

export interface Course {
  id: number;
  fullname: string;
}

export interface CourseInfo {
  id: number;
  name: string;
  modules: [];
}

export interface CourseModule {
  id: number;
  modname: string;
  name: string;
  modplural: string;
  dates: Date[];
}
