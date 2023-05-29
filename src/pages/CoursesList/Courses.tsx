import { useEffect, useState } from "react";

import { Course } from "./consts";
import { CourseItem } from "../../components/Course/CourseItem";
import { Service } from "../../utils/api/requests";

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  async function getCourses() {
    try {
      const response = await Service.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className=" 2xl:w-11/12 xl:w-11/12 lg:w-5/6  ">
      <label className="block text-gray-700 text-3xl font-bold mb-2">
        Мои курсы
      </label>
      <div
        role="list"
        className="flex flex-wrap justify-between  relative divide-y p-10 "
      >
        {courses &&
          courses.map((course, id) => <CourseItem key={id} {...course} />)}
      </div>
    </div>
  );
};
