import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

import { FileItem } from "../../components/File/File";
import { TimeParser } from "../../components/Time/Time";

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
  cmid: 0,
  name: "",
  configs: [],
  introattachments: [],
  activity: "",
  intro: "",
  duedate: 0,
  allowsubmissionsfromdate: 0,
};

export const AssignPage = () => {
  const [assigment, setAssigment] = useState<Assignment>(InitialState);
  const [submission, setSubmission] = useState<any>();
  const [submissionStatus, setSubmissionStatus] = useState<any>();
  const { state } = useLocation();
  const { id } = state;

  useEffect(() => {
    let apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_assign_get_assignments&moodlewsrestformat=json&courseids[0]=3`;

    axios.get(apiUrl).then((response) => {
      getAssign(response.data.courses[0].assignments);
    });

    let apiUrl1 = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_assign_get_submissions&moodlewsrestformat=json&assignmentids[0]=${assigment.id}`;

    axios.get(apiUrl1).then((response) => {
      setSubmission(response.data.assignments[0].submissions[0]);
    });

    let apiUrl2 = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_assign_get_submission_status&moodlewsrestformat=json&assignid=1`;

    axios.get(apiUrl2).then((response) => {
      setSubmissionStatus(response.data.feedback);
    });

    /*    axios.all([axios.get(apiUrl), axios.get(apiUrl1), axios.get(apiUrl2)]).then(
      axios.spread((Assign, Submission, SubmissionStatus) => {
        getAssign(Assign.data.courses[0].assignments);
        setSubmission(Submission.data.assignments[0].submissions[0]);
        setSubmissionStatus(SubmissionStatus.data.feedback);
      })
    );*/
  }, [setAssigment, setSubmission, setSubmissionStatus]);

  const getAssign = (data: Assignment[]) => {
    data.map((item: Assignment) => {
      item.cmid === id && setAssigment(item);
    });
  };

  return (
    <div>
      {assigment && (
        <div className="p-5 m-5 bg-gray-100 rounded-xl">
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
            Открыто:{" "}
            <TimeParser
              timestamp={assigment.allowsubmissionsfromdate}
              type={"minutes"}
            />
          </div>
          <div>
            Срок сдачи:{" "}
            <TimeParser timestamp={assigment.duedate} type={"minutes"} />
          </div>
        </div>
      )}
      {submission && (
        <div className="p-5 m-5 bg-gray-100 rounded-xl">
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
        </div>
      )}
      {submissionStatus && (
        <div className="p-5 m-5 bg-gray-100 rounded-xl">
          Отзыв:
          <div>Оценка: {parse(submissionStatus.gradefordisplay)}</div>
          <div>
            Оценено в:{" "}
            <TimeParser
              timestamp={submissionStatus.gradeddate}
              type={"minutes"}
            />
          </div>
          <div>
            {submissionStatus.plugins[0] && (
              <div>
                {submissionStatus.plugins[0].editorfields[0].description} :
                {parse(submissionStatus.plugins[0].editorfields[0].text)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
