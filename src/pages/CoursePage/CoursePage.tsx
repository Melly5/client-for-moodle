import { useLocation, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import parse from "html-react-parser";

const Folder = lazy(() => import("../../components/courseList/Folder/Folder"));
const Forum = lazy(() => import("../../components/courseList/Forum/Forum"));
const Assign = lazy(() => import("../../components/courseList/Assign/Assign"));
const Quiz = lazy(() => import("../../components/courseList/Quiz/Quiz"));
const Lesson = lazy(() => import("../../components/courseList/Lesson/Lesson"));
const Resource = lazy(
  () => import("../../components/courseList/Resource/Resource")
);
const Label = lazy(() => import("../../components/courseList/Label/Label"));
const Webpage = lazy(
  () => import("../../components/courseList/Webpage/Webpage")
);

import { CourseInfo, useGetCourseInfoQuery } from "../../redux/slices/apiSlice";

export const CoursePage = () => {
  const params = useParams();
  const { state } = useLocation();
  const { course } = state;
  let id = params.id as string;

  const {
    data: courseItems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCourseInfoQuery(id);

  if (isError) return <div>Error: {error.toString()}</div>;

  if (isLoading) return <div className="font-bold text-2xl">Loading...</div>;

  if (isSuccess)
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
                    <Suspense fallback={<p>loading</p>}>
                      {module.modname === "folder" && <Folder {...module} />}
                      {module.modname === "forum" && <Forum {...module} />}
                      {module.modname === "assign" && (
                        <Assign
                          assign={module}
                          courseid={params.id as string}
                        />
                      )}
                      {module.modname === "quiz" && <Quiz {...module} />}
                      {module.modname === "lesson" && <Lesson {...module} />}
                      {module.modname === "resource" && (
                        <Resource {...module} />
                      )}
                      {module.modname === "label" && <Label {...module} />}
                      {module.modname === "page" && (
                        <Webpage page={module} courseid={params.id as string} />
                      )}
                    </Suspense>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};
