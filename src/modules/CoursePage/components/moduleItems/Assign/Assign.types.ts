import { Date } from "../../../../../shared/types/types";

export interface AssignComponent {
  id: number;
  name: string;
  dates: Date;
  contextid: number;
  instance: number;
}

export interface AssignDate {
  label: string;
  timestamp: number;
}

export interface AssignProps {
  assign: AssignComponent;
  courseid: number;
}
