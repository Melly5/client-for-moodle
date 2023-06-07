import { useNavigate } from "react-router-dom";
import { Course } from "../../../redux/slices/apiSlice";

export const CourseItem = (course: Course) => {
  const navigate = useNavigate();

  return (
    <div className="justify-around flex flex-col flex-wrap gap-x-6 my-4 mx-3 p-5 w-96 xl:w-92 h-48 divide-gray-100 rounded-lg bg-gray-100">
      <p className="text-lg font-semibold leading-6 text-gray-900 ">
        {course.fullname}
      </p>
      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
        Преподаватель: {course.id}
      </p>
      <div
        className="w-28 px-2 py-1.5 text-center text-white bg-blue-500 hover:bg-blue-700 hover:cursor-pointer rounded-full"
        onClick={() =>
          navigate(`/course/${course.id}`, {
            state: { course: course },
          })
        }
      >
        Перейти &rarr;
      </div>
    </div>
  );
};
