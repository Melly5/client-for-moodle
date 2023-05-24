import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

export interface LessonI {
  page: LessonPageI;
  answers: [
    {
      id: number;
      answerfiles: [];
      responsefiles: [];
      jumpto: number;
      grade: number;
      score: number;
      flags: number;
      timecreated: number;
      timemodified: number;
      answer: string;
      answerformat: number;
      response: string;
      responseformat: number;
    }
  ];
}
export interface LessonPageI {
  id: number;
  lessonid: number;
  prevpageid: number;
  nextpageid: number;
  qtype: number;
  qoption: number;
  timecreated: number;
  timemodified: number;
  title: string;
  contents: string;
}

const InitialState: LessonI = {
  page: {
    id: -1,
    lessonid: 0,
    prevpageid: 0,
    nextpageid: 0,
    qtype: 0,
    qoption: 0,
    timecreated: 0,
    timemodified: 0,
    title: "",
    contents: "",
  },
  answers: [
    {
      id: 0,
      answerfiles: [],
      responsefiles: [],
      jumpto: -1,
      grade: 0,
      score: 0,
      flags: 0,
      timecreated: 1684816957,
      timemodified: 0,
      answer: "Далее",
      answerformat: 1,
      response: "",
      responseformat: 1,
    },
  ],
};

export const LessonPage = () => {
  const { state } = useLocation();
  const { id, name, instance, startPage } = state;
  const [lessonPage, setLessonPage] = useState<LessonI>(InitialState);
  let navigate = useNavigate();

  const handleClickNextPage = (jump: number) => {
    jump === -1 &&
      navigate(`/lesson/${id + 1}`, {
        state: {
          id: id + 1,
          name,
          instance,
          startPage: lessonPage.page.nextpageid,
        },
      });
    jump === -40 &&
      navigate(`/lesson/${id + 1}`, {
        state: {
          id,
          name,
          instance,
          startPage: lessonPage.page.prevpageid,
        },
      });
  };

  useEffect(() => {
    let apiLessonPage = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_lesson_get_page_data&moodlewsrestformat=json&lessonid=${instance}&pageid=${startPage}`;
    const fetchData = async () => {
      const result = await axios(apiLessonPage);
      setLessonPage(result.data);
    };
    fetchData();
    console.log(lessonPage);
  }, [startPage]);

  return (
    <div className="w-5/6">
      <h4 className="m-5 text-xl font-bold">{name}</h4>
      {lessonPage.page && (
        <div>
          <div className="m-5 font-bold">{lessonPage.page.title}</div>
          <div>{parse(lessonPage.page.contents)}</div>
        </div>
      )}
      {lessonPage.answers && (
        <div>
          <div className="flex">
            {lessonPage.answers.map((answer: any, id: number) => (
              <button
                key={id}
                className="mx-4 px-4 py-2 rounded-xl bg-blue-300"
                onClick={() => handleClickNextPage(answer.jumpto)}
              >
                {answer.answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
