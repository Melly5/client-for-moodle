import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";

export interface Course {
  id: number;
  fullname: string;
  shortname: string;
  displayname: string;
  categoryid: number;
  categorysortorder: number;
  idnumber: string;
  summary: string;
  summaryformat: number;
  format: string;
  showgrades: number;
  newsitems: number;
  startdate: number;
  enddate: number;
  numsections: number;
  maxbytes: number;
  showreports: number;
  visible: number;
  hiddensections: number;
  groupmode: number;
  groupmodeforce: number;
  defaultgroupingid: number;
  timecreated: number;
  timemodified: number;
  enablecompletion: number;
  completionnotify: number;
  lang: string;
  forcetheme: string;
  courseformatoptions: [
    {
      name: string;
      value: number;
    }
  ];
  showactivitydates: boolean;
  showcompletionconditions: boolean;
}

export interface Users {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  department: string;
  firstaccess: number;
  lastaccess: number;
  lastcourseaccess: number;
  description: string;
  descriptionformat: number;
  profileimageurlsmall: string;
  profileimageurl: string;
  roles: [];
  preferences: [
    {
      name: string;
      value: string;
    }
  ];
  enrolledcourses: [
    {
      id: number;
      fullname: string;
      shortname: string;
    }
  ];
}

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
      console.log(resp.data);
    });
    const apiUrl1 = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=${token}&wsfunction=${func1}&moodlewsrestformat=json&courseid=1`;
    axios.get(apiUrl1).then((resp) => {
      const allUsers = resp.data;
      setUsers(allUsers);
      console.log(resp.data);
    });
  }, []);

  return (
    <div className=" w-1/2">
      {func}
      <ul
        role="list"
        className="relative divide-y divide-gray-100 rounded-lg bg-gray-100 p-10 m-10"
      >
        {courses.map((course) => (
          <li
            key={course.fullname}
            className="flex justify-between gap-x-6 py-5 w-150px"
          >
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  shortname: {course.shortname}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  fullname: {course.fullname}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                displayname: {course.displayname}
              </p>
            </div>
          </li>
        ))}
      </ul>
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
