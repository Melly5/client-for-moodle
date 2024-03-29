import { useLocation, useParams } from "react-router-dom";
import { FC, lazy, Suspense } from "react";
import parse from "html-react-parser";

const Folder = lazy(
  () => import("./components/moduleItems/Folder/Folder.component")
);
const Forum = lazy(
  () => import("./components/moduleItems/Forum/Forum.component")
);
const Assign = lazy(
  () => import("./components/moduleItems/Assign/Assign.component")
);
const Quiz = lazy(() => import("./components/moduleItems/Quiz/Quiz.component"));
const Lesson = lazy(
  () => import("./components/moduleItems/Lesson/Lesson.component")
);
const Resource = lazy(
  () => import("./components/moduleItems/Resource/Resource.component")
);
const Label = lazy(
  () => import("./components/moduleItems/Label/Label.component")
);
const Webpage = lazy(
  () => import("./components/moduleItems/Webpage/Webpage.component")
);

import CourseItemLoader from "./components/Loader/Loader.component";
import { Article } from "../../shared/components/Article/Article";
import { Url } from "./components/moduleItems/Url/Url.component";
import { Survey } from "./components/moduleItems/Survey/Survey.component";
import { CourseInfo, CourseModule } from "./CoursePage.types";
import { useGetCourseInfoQuery } from "./CoursePage.api";

export const CoursePage: FC = () => {
  const params = useParams();
  const { state } = useLocation();
  const { course } = state;
  const id = params.id;

  const { data: courseItems, isLoading } = useGetCourseInfoQuery(id);
  console.log(courseItems);
  return (
    <>
      {isLoading ? (
        <div className="font-bold text-2xl">Loading...</div>
      ) : (
        <div>
          <div className="m-5">
            <Article> {course.fullname}</Article>
            <div className="my-5">{parse(course.summary)}</div>
          </div>
          <div className="w-3/5">
            {courseItems?.map((info: CourseInfo, id: number) => (
              <div key={id} className="bg-gray-100 m-5 py-5 px-20 rounded-3xl">
                <div className="my-5 text-xl font-bold">{info.name}</div>
                <div className="flex flex-col m-5">
                  {info.modules.map((module: CourseModule, id: number) => (
                    <div
                      key={id}
                      className="flex flex-col content-center my-3 cursor-pointer"
                    >
                      <Suspense fallback={<CourseItemLoader />}>
                        {module.modname === "folder" && <Folder {...module} />}
                        {module.modname === "forum" && <Forum {...module} />}
                        {module.modname === "assign" && (
                          <Assign assign={module} courseid={params.id} />
                        )}
                        {module.modname === "quiz" && <Quiz {...module} />}
                        {module.modname === "lesson" && <Lesson {...module} />}
                        {module.modname === "resource" && (
                          <Resource {...module} />
                        )}
                        {module.modname === "label" && <Label {...module} />}
                        {module.modname === "page" && (
                          <Webpage page={module} courseid={params.id} />
                        )}
                        {module.modname === "url" && (
                          <Url url={module} courseid={params.id} />
                        )}
                        {module.modname === "survey" && <Survey {...module} />}
                      </Suspense>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
