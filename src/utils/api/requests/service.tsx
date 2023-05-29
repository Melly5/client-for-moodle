import { Assignment } from "../../../pages/AssignPage/AssignPage";
import { API, api } from "../instance";

const allCoursesUrl = `${API}core_course_get_courses`;
const courseContentUrl = `${API}core_course_get_contents`;
const allAssignmentsUrl = `${API}mod_assign_get_assignments`;
const allSubmissionsUrl = `${API}mod_assign_get_submissions`;
const submissionStatusUrl = `${API}mod_assign_get_submission_status`;

export const Service = {
  async getAllCourses() {
    return api.get(allCoursesUrl);
  },
  async getCourseContent(id: string) {
    return api.get(`${courseContentUrl}&courseid=${id}`);
  },
  async getAllAssignments(courseid: string) {
    return api.get(`${allAssignmentsUrl}&courseids[0]=${courseid}`);
  },
  async getAllSubmissions(assignid: number) {
    console.log(assignid);
    return api.get(`${allSubmissionsUrl}&assignmentids[0]=${assignid}`);
  },
  async getSubmissionStatus(assignid: number) {
    return api.get(`${submissionStatusUrl}&assignid=${assignid}`);
  },
};
