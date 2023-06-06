import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

import FileItem from "../../shared/components/File/File";
import TimeParser from "../../shared/components/Time/Time";
import { Article } from "../../shared/components/Article/Article";

import { Service } from "../../tempForAssignPage/utils/api/requests";
import {
  Assignment,
  Submission,
  SubmissionStatus,
  SubmissionPlugins,
  InitialState,
} from "./AssignPage.types";
import { File } from "../../services/api/api.service";

export const AssignPage = () => {
  const [assignment, setAssignment] = useState<Assignment>(InitialState);
  const [submission, setSubmission] = useState<Submission>();
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>();
  console.log(submissionStatus);
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
  }, []);

  return (
    <div className="w-3/5">
      {assignment && (
        <div className="p-5 m-5 bg-gray-100 rounded-xl">
          <Article>{assignment.name}</Article>
          {assignment.intro && (
            <div>
              Тема:<div className="m-2 textItem">{parse(assignment.intro)}</div>
            </div>
          )}

          <div>
            {assignment.introattachments.length !== 0 && (
              <div>
                Файлы:
                {assignment.introattachments.map(
                  (content: File, id: number) => (
                    <div key={id}>
                      <FileItem {...content} />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div>
            <span className="mr-4">Открыто:</span>
            <TimeParser
              timestamp={assignment.allowsubmissionsfromdate}
              type={"minutes"}
            />
          </div>
          <div>
            <span className="mr-4"> Срок сдачи:</span>
            <TimeParser timestamp={assignment.duedate} type={"minutes"} />
          </div>
        </div>
      )}
      {submission && (
        <div className="p-5 m-5 bg-gray-100 rounded-xl">
          <div>
            Cостояние ответа:
            {submission.gradingstatus &&
              submission.gradingstatus === "graded" && (
                <span className="mx-3">Оценено</span>
              )}
            {submission.gradingstatus &&
              submission.gradingstatus === "notgraded" && <div>Черновик</div>}
            {submission.gradingstatus &&
              submission.gradingstatus === "ungraded" && <div>Не оценено</div>}
          </div>
          <div>
            {submission.plugins[0].fileareas[0].files.length != 0 &&
              submission.plugins.map((item: SubmissionPlugins, id: number) => (
                <div key={id}>
                  <span> Ответ в виде файла:</span>
                  {item.type === "file" &&
                    item.fileareas[0].files.map((content: File, id: number) => (
                      <FileItem key={id} {...content} />
                    ))}
                  {item.type === "comments" && <div>Комменатрии</div>}
                </div>
              ))}
          </div>
        </div>
      )}
      {submissionStatus && (
        <div className="p-5 m-5 bg-gray-100 rounded-xl">
          <span className="text-xl font-bold">Отзыв:</span>
          <div>Оценка: {parse(submissionStatus.gradefordisplay)}</div>
          <div>
            Оценено в:{" "}
            <TimeParser
              timestamp={submissionStatus.gradeddate}
              type={"minutes"}
            />
          </div>
          <div>
            {submissionStatus.plugins[0].editorfields[0].text && (
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
