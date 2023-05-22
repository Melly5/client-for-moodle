import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

export interface Assignment {
  cmid: number;
  name: string;
  configs: [];
  introattachments: [];
  activity: string;
  intro: string;
}

export const AssignPage = () => {
  const [assigment, setAssigment] = useState<Assignment[]>([]);
  const { state } = useLocation();
  const { id } = state;

  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_assign_get_assignments&moodlewsrestformat=json&courseids[0]=3`;
    setTimeout(() => {
      axios.get(apiUrl).then((resp) => {
        const data = resp.data;
        setAssigment(data.courses[0].assignments);
      });
    });
  }, []);

  const getAssign = (data: any) => {
    data.map((item: any) => {
      item.cmid === id && setAssigment(item);
    });
  };

  getAssign(assigment);

  console.log(assigment);

  return (
    <div>
      {assigment.map((item: any, id) => (
        <div key={id}>
          <div>Название: {item.name}</div>
          <div>Тема:{parse(item.intro)}</div>
          <div>Файлы:</div>
          <div>
            {item.introattachments.map((file: any, id: number) => (
              <div key={id}>{file.filename}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
