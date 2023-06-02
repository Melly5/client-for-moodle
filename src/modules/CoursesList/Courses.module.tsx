import React from "react";

import { CourseItem } from "./components/CourseItem";
import { Course, useGetCoursesQuery } from "../../services/api/api.service";

export const Courses: React.FC = () => {
  const { data: courseCards, isLoading } = useGetCoursesQuery();

  return (
    <>
      {isLoading ? (
        <div className="font-bold text-2xl">Loading...</div>
      ) : (
        <div className=" 2xl:w-11/12 xl:w-11/12 lg:w-5/6  ">
          <label className="block text-gray-700 text-3xl font-bold mb-2">
            Мои курсы
          </label>
          <div
            role="list"
            className="flex flex-wrap justify-between  relative divide-y p-10 "
          >
            {courseCards &&
              courseCards.map((courseCard: Course, id: number) => (
                <CourseItem key={id} {...courseCard} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};
