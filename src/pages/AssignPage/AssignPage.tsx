import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { FileItem } from "../../components/File/File";

export interface Assignment {
  cmid: number;
  name: string;
  configs: [];
  introattachments: [];
  activity: string;
  intro: string;
}

export interface File {
  filename: string;
  filepath: string;
  filesize: number;
  fileurl: string;
  isexternalfile: boolean;
  mimetype: string;
  timemodified: number;
}

const InitialState: Assignment = {
  cmid: 2,
  name: "assign",
  configs: [],
  introattachments: [],
  activity: "activity",
  intro: "intro",
};

export const AssignPage = () => {
  const [assigment, setAssigment] = useState<Assignment>(InitialState);
  const { state } = useLocation();
  const { id } = state;
  let token = "2b8e54a638f0422b6859f223fa0a086e";

  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_assign_get_assignments&moodlewsrestformat=json&courseids[0]=3`;
    setTimeout(() => {
      axios.get(apiUrl).then((resp) => {
        const data = resp.data;
        getAssign(data.courses[0].assignments);
      });
    });
  }, []);

  const getAssign = (data: Assignment[]) => {
    data.map((item: Assignment) => {
      item.cmid === id && setAssigment(item);
    });
  };

  console.log(assigment);

  return (
    <div>
      <div key={id}>
        <div>Название: {assigment.name}</div>
        <div>Тема:{parse(assigment.intro)}</div>
        <div>Файлы:</div>
        <div>
          {assigment.introattachments &&
            assigment.introattachments.map((content: File, id: number) => (
              <div key={id}>
                <FileItem {...content} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
