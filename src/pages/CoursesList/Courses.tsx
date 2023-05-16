import { useEffect, useState } from "react";
import axios from "axios";
import { Course, Users } from "./consts";
import { CourseItem } from "./components/CourseItem";

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const token = "2b8e54a638f0422b6859f223fa0a086e";
  const func = "core_course_get_courses";
  const func1 = "core_enrol_get_enrolled_users";

  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=${token}&wsfunction=${func}&moodlewsrestformat=json`;
    axios.get(apiUrl).then((resp) => {
      const allCourses = resp.data;
      setCourses(allCourses);
    });
    const apiUrl1 = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=${token}&wsfunction=${func1}&moodlewsrestformat=json&courseid=1`;
    axios.get(apiUrl1).then((resp) => {
      const allUsers = resp.data;
      setUsers(allUsers);
    });
  }, []);

  return (
    <div className=" w-5/6">
      <label className="block text-gray-700 text-3xl font-bold mb-2">
        Мои курсы
      </label>
      <div
        role="list"
        className="flex justify-between  relative divide-y p-10 "
      >
        {courses.map((course) => (
          <CourseItem {...course} />
        ))}
      </div>

      {func1}
      <ul
        role="list"
        className="relative divide-y divide-gray-100  rounded-lg bg-gray-100 p-10 m-10"
      >
        {users.map((course_user) => (
          <li
            key={course_user.fullname}
            className="flex justify-between gap-x-6 py-5 w-150px"
          >
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  firstname: {course_user.firstname}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  lastname: {course_user.lastname}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  email: {course_user.email}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
