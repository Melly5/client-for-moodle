import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "./consts";
import { CourseItem } from "./components/CourseItem";

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const token = "2b8e54a638f0422b6859f223fa0a086e";
  const func = "core_course_get_courses";

  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=${token}&wsfunction=${func}&moodlewsrestformat=json`;
    axios.get(apiUrl).then((resp) => {
      const allCourses = resp.data;
      setCourses(allCourses);
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
    </div>
  );
};
