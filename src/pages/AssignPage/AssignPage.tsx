import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

import { FileItem } from "../../components/File/File";
import { TimeParser } from "../../components/Time/Time";
import { Service } from "../../utils/api/requests";

export interface Assignment {
  id: number;
  cmid: number;
  course: number;
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
  id: 0,
  cmid: 0,
  course: 0,
  name: "",
  configs: [],
  introattachments: [],
  activity: "",
  intro: "",
  duedate: 0,
  allowsubmissionsfromdate: 0,
};

export const AssignPage = () => {
  const [assignment, setAssignment] = useState<Assignment>(InitialState);
  const [submission, setSubmission] = useState<any>();
  const [submissionStatus, setSubmissionStatus] = useState<any>();

  const { state } = useLocation();
  const { courseid, id } = state;

  async function getAssignment() {
    try {
      const response = await Service.getAllAssignments(courseid);

      getAssign(response.data.courses[0].assignments);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSubmissions() {
    try {
      const response = await Service.getAllSubmissions(id);
      setSubmission(response.data.assignments[0].submissions[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSubmissionStatus() {
    try {
      const response = await Service.getSubmissionStatus(id);
      setSubmissionStatus(response.data.feedback);
    } catch (error) {
      console.error(error);
    }
  }

  const getAssign = (data: Assignment[]) => {
    data.map((item: Assignment) => {
      item.id === id && setAssignment(item);
    });
  };

  useEffect(() => {
    getAssignment();
    getSubmissions();
    getSubmissionStatus();
  }, [setAssignment, setSubmission, setSubmissionStatus]);

  return (
    <div>
      {assignment && (
        <div className="p-5 m-5 bg-gray-100 rounded-xl">
          <div>Название: {assignment.name}</div>
          <div>Тема:{parse(assignment.intro)}</div>
          <div>Файлы:</div>
          <div>
            {assignment.introattachments &&
              assignment.introattachments.map((content: File, id: number) => (
                <div key={id}>
                  <FileItem {...content} />
                </div>
              ))}
          </div>
          <div>
            Открыто:{" "}
            <TimeParser
              timestamp={assignment.allowsubmissionsfromdate}
              type={"minutes"}
            />
          </div>
          <div>
            Срок сдачи:{" "}
            <TimeParser timestamp={assignment.duedate} type={"minutes"} />
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
                <div className="m-2 px-4 py-2 rounded-md bg-white">
                  {parse(submissionStatus.plugins[0].editorfields[0].text)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
