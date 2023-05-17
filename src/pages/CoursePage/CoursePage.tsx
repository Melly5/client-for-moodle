import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Folder } from "../../components/Folder/Folder";
import { Forum } from "../../components/Forum/Forum";

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
      {courseInfo.map((info) => (
        <>
          <div>{info.name}</div>
          <div className="flex flex-col m-5">
            {info.modules.map((module: any) => (
              <>
                {module.modname === "folder" && <Folder {...module} />}
                {module.modname === "forum" && <Forum {...module} />}
                <div>{module.name}</div>
              </>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
