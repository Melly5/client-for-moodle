import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { FileItem } from "../../components/File/File";
import SimpleDateTime from "react-simple-timestamp-to-date";

export interface Assignment {
  cmid: number;
  name: string;
  configs: [];
  introattachments: [];
  activity: string;
  intro: string;
  duedate: number;
  allowsubmissionsfromdate: number;
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
  duedate: 3255,
  allowsubmissionsfromdate: 1683910800,
};

export const AssignPage = () => {
  const [assigment, setAssigment] = useState<Assignment>(InitialState);
  const [submission, setSubmission] = useState<any>();
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
    const apiUrl1 = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_assign_get_submissions&moodlewsrestformat=json&assignmentids[0]=${assigment.id}`;
    setTimeout(() => {
      axios.get(apiUrl1).then((resp) => {
        const data = resp.data;

        setSubmission(data?.assignments[0].submissions[0]);
      });
    });
  }, []);

  const getAssign = (data: Assignment[]) => {
    data.map((item: Assignment) => {
      item.cmid === id && setAssigment(item);
    });
  };
  //console.log(submission);
  console.log(assigment);

  return (
    <div>
      {assigment && (
        <>
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
          <div>
            Открыто:
            <SimpleDateTime>
              {assigment.allowsubmissionsfromdate}
            </SimpleDateTime>
          </div>
          <div>
            Срок сдачи: <SimpleDateTime>{assigment.duedate}</SimpleDateTime>
          </div>
        </>
      )}
      {submission && (
        <>
          <div>
            Cостояние ответа:
            {submission.gradingstatus &&
              submission.gradingstatus === "graded" && <div>оценено</div>}
            {submission.gradingstatus &&
              submission.gradingstatus === "notgraded" && <div>чернвоик</div>}
            {submission.gradingstatus &&
              submission.gradingstatus === "ungraded" && <div>не оценено</div>}
          </div>
          <div>
            {submission.plugins &&
              submission.plugins.map((item: any) => (
                <div>
                  {item.type === "file" &&
                    item.fileareas[0].files.map((content: File, id: number) => (
                      <FileItem key={id} {...content} />
                    ))}
                  {item.type === "comments" && <div>комменатрии</div>}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
