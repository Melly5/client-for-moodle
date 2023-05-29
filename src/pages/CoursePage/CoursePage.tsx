import { useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import { Folder } from "../../components/courseList/Folder/Folder";
import { Forum } from "../../components/courseList/Forum/Forum";
import { Assign } from "../../components/courseList/Assign/Assign";
import { Quiz } from "../../components/courseList/Quiz/Quiz";
import { Lesson } from "../../components/courseList/Lesson/Lesson";
import { Resource } from "../../components/courseList/Resource/Resource";
import { Label } from "../../components/courseList/Label/Label";
import { Webpage } from "../../components/courseList/Webpage/Webpage";

export interface info {
  id: number;
  name: string;
  modules: [];
}

export const CoursePage = () => {
  const [courseInfo, setCourseInfo] = useState<info[]>([]);
  const token = "2b8e54a638f0422b6859f223fa0a086e";
  const func = "core_course_get_contents";
  const params = useParams();
  const { state } = useLocation();
  const { course } = state;

  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=${token}&wsfunction=${func}&moodlewsrestformat=json&courseid=${params.id}`;
    setTimeout(() => {
      axios.get(apiUrl).then((resp) => {
        const data = resp.data;
        setCourseInfo(data);
      });
    });
  }, []);

  console.log(courseInfo);

  return (
    <div>
      <div className="m-5">
        <label className="text-2xl font-semibold my-5">{course.fullname}</label>
        <div className="my-5">{parse(course.summary)}</div>
      </div>
      <div className="w-3/5">
        {courseInfo.map((info, id) => (
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
                  {module.modname === "assign" && <Assign {...module} />}
                  {module.modname === "quiz" && <Quiz {...module} />}
                  {module.modname === "lesson" && <Lesson {...module} />}
                  {module.modname === "resource" && <Resource {...module} />}
                  {module.modname === "label" && <Label {...module} />}
                  {module.modname === "page" && <Webpage {...module} />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
