import { API, api } from "../instance";

const allCoursesUrl = `${API}core_course_get_courses`;
const courseContentUrl = `${API}core_course_get_contents`;
const allAssignmentsUrl = `${API}mod_assign_get_assignments`;
const allSubmissionsUrl = `${API}mod_assign_get_submissions`;
const submissionStatusUrl = `${API}mod_assign_get_submission_status`;
const forumDiscussionsUrl = `${API}mod_forum_get_forum_discussions`;
const lessonPageContentUrl = `${API}mod_lesson_get_page_data`;
const webpageContentUrl = `${API}mod_page_get_pages_by_courses`;

export const Service = {
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
