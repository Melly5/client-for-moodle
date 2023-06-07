import { File } from "../../shared/types/types";

export interface Assignment {
  id: number;
  cmid: number;
  course: number;
  name: string;
  configs: [];
  introattachments: [];
  activity: string;
  intro: string;
  duedate: number;
  allowsubmissionsfromdate: number;
}

export const InitialState: Assignment = {
  id: 0,
  cmid: 0,
  course: 0,
  name: "",
  configs: [],
  introattachments: [],
  activity: "",
  intro: "",
  duedate: 0,
  allowsubmissionsfromdate: 0,
};

export interface Submission {
  id: number;
  userid: number;
  gradingstatus: string;
  groupid: number;
  attemptnumber: number;
  timecreated: number;
  timemodified: number;
  status: string;
  plugins: [];
}

export interface SubmissionStatus {
  grade: StatusGrade;
  gradedate: number;
  gradefordisplay: string;
  plugins: [
    {
      name: string;
      type: string;
      fileareas: [];
      editorfields: [
        {
          description: string;
          text: string;
        }
      ];
    }
  ];
}

export interface StatusGrade {
  id: number;
  userid: number;
  assignment: number;
  attemptnumber: number;
  grade: string;
  grader: number;
  timecreated: number;
  timemodified: number;
}

export interface SubmissionPlugins {
  type: string;
  name: string;
  fileareas: [
    {
      area: string;
      files: File[];
    }
  ];
}
