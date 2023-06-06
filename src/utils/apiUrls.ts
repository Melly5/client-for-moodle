const token = "2b8e54a638f0422b6859f223fa0a086e";
const API = `/server.php?wstoken=${token}&moodlewsrestformat=json&wsfunction=`;

export const apiUrls = {
  allCoursesUrl: `${API}core_course_get_courses`,
  courseContentUrl: `${API}core_course_get_contents`,
  allAssignmentsUrl: `${API}mod_assign_get_assignments`,
  allSubmissionsUrl: `${API}mod_assign_get_submissions`,
  submissionStatusUrl: `${API}mod_assign_get_submission_status`,
  forumDiscussionsUrl: `${API}mod_forum_get_forum_discussions`,
  lessonPageContentUrl: `${API}mod_lesson_get_page_data`,
  webpageContentUrl: `${API}mod_page_get_pages_by_courses`,
  quizAccessInfoUrl: `${API}mod_quiz_get_quiz_access_information`,
  quizAttemptDataUrl: `${API}mod_quiz_get_attempt_data`,
  quizStartAttemptUrl: `${API}mod_quiz_start_attempt`,
  urlInfoUrl: `${API}mod_url_get_urls_by_courses`,
  surveyContentUrl: `${API}mod_survey_get_questions`,
};
