import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import { useEffect } from "react";

import { AppDispatch } from "../../redux/store";
import {
  CourseInfo,
  getCourse,
  selectAllCourseContent,
} from "../../redux/slices/courseSlice";

import { Folder } from "../../components/courseList/Folder/Folder";
import { Forum } from "../../components/courseList/Forum/Forum";
import { Assign } from "../../components/courseList/Assign/Assign";
import { Quiz } from "../../components/courseList/Quiz/Quiz";
import { Lesson } from "../../components/courseList/Lesson/Lesson";
import { Resource } from "../../components/courseList/Resource/Resource";
import { Label } from "../../components/courseList/Label/Label";
import { Webpage } from "../../components/courseList/Webpage/Webpage";

export const CoursePage = () => {
  const params = useParams();
  const { state } = useLocation();
  const { course } = state;
  let id = params.id as string;

  const dispatch = useDispatch<AppDispatch>();

  const courses = useSelector(selectAllCourseContent);
  const { courseItems, status, error } = courses;

  useEffect(() => {
    let isMounted = true;

    if (status === "idle") {
      dispatch(getCourse(id));
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
      <div>
        <div className="m-5">
          <label className="text-2xl font-semibold my-5">
            {course.fullname}
          </label>
          <div className="my-5">{parse(course.summary)}</div>
        </div>
        <div className="w-3/5">
          {courseItems.map((info: CourseInfo, id: number) => (
            <div key={id} className="bg-gray-100 m-5 py-5 px-20 rounded-3xl">
              <div className="my-5 text-xl font-bold">{info.name}</div>
              <div className="flex flex-col m-5">
                {info.modules.map((module: any, id: number) => (
                  <div
                    key={id}
                    className="flex content-center my-3 cursor-pointer"
                  >
                    {module.modname === "folder" && <Folder {...module} />}
                    {module.modname === "forum" && <Forum {...module} />}
                    {module.modname === "assign" && (
                      <Assign assign={module} courseid={params.id as string} />
                    )}
                    {module.modname === "quiz" && <Quiz {...module} />}
                    {module.modname === "lesson" && <Lesson {...module} />}
                    {module.modname === "resource" && <Resource {...module} />}
                    {module.modname === "label" && <Label {...module} />}
                    {module.modname === "page" && (
                      <Webpage page={module} courseid={params.id as string} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};
