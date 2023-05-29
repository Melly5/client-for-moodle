import { API, api } from "../instance";

const allCoursesUrl = `${API}core_course_get_courses`;
const courseContentUrl = `${API}core_course_get_contents`;

export const Service = {
  async getAllCourses() {
    return api.get(allCoursesUrl);
  },
  async getCourseContent(id: string) {
    return api.get(`${courseContentUrl}&courseid=${id}`);
  },
};
