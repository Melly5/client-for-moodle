import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CourseItem } from "../../components/Course/CourseItem";

import { AppDispatch } from "../../redux/store";
import {
  Course,
  getCourses,
  selectAllCourses,
} from "../../redux/slices/coursesListSlice";

export const Courses = () => {
  const dispatch = useDispatch<AppDispatch>();

  const courses = useSelector(selectAllCourses);
  const { courseCards, status, error } = courses;

  useEffect(() => {
    let isMounted = true;

    if (status === "idle") {
      dispatch(getCourses());
    }

    return () => {
      isMounted = false;
    };
  }, [status, dispatch]);
  if (error !== "") return <div>Error: {error}</div>;

  if (status === "loading")
    return <div className="font-bold text-2xl">Loading...</div>;

  if (status === "successful")
    return (
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
    );
};
