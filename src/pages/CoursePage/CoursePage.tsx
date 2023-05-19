import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Folder } from "../../components/Folder/Folder";
import { Forum } from "../../components/Forum/Forum";
import { Assign } from "../../components/Assign/Assign";
import { Quiz } from "../../components/Quiz/Quiz";

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
    <div className="flex flex-col content-center">
      {courseInfo.map((info, id) => (
        <div key={id}>
          <div>{info.name}</div>
          <div className="flex flex-col m-5">
            {info.modules.map((module: any, id: number) => (
              <div key={id} className="flex content-center my-3">
                {module.modname === "folder" && <Folder {...module} />}
                {module.modname === "forum" && <Forum {...module} />}
                {module.modname === "assign" && <Assign {...module} />}
                {module.modname === "quiz" && <Quiz {...module} />}
                <div>{module.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="300"
        height="200"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
      ></iframe>
    </div>
  );
};
