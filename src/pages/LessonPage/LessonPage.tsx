import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import parse from "html-react-parser";

import { AppDispatch } from "../../redux/store";
import {
  LessonPageAnswersI,
  LessonProps,
  getLessonPageContent,
  selectAllLessonPageContent,
} from "../../redux/slices/lessonSlice";

export const LessonPage = () => {
  const { state } = useLocation();
  const { id, name, instance, startPage } = state;
  let navigate = useNavigate();

  const handleClickNextPage = (jump: number) => {
    jump === -1 &&
      navigate(`/lesson/${id + 1}`, {
        state: {
          id: id + 1,
          name,
          instance,
          startPage: lessonPageItems.page.nextpageid,
        },
      });
    jump === -40 &&
      navigate(`/lesson/${id + 1}`, {
        state: {
          id,
          name,
          instance,
          startPage: lessonPageItems.page.prevpageid,
        },
      });
  };

  const dispatch = useDispatch<AppDispatch>();

  const lesson = useSelector(selectAllLessonPageContent);
  const { lessonPageItems, status, error } = lesson;

  let props: LessonProps = {
    lessonid: instance,
    startpageid: startPage,
  };

  useEffect(() => {
    let isMounted = true;

    if (status === "idle") {
      dispatch(getLessonPageContent(props));
    }

    return () => {
      isMounted = false;
    };
  }, [status, dispatch, startPage]);
  //не происходит ререндер по клику

  if (error !== "") return <div>Error: {error}</div>;

  if (status === "loading")
    return <div className="font-bold text-2xl">Loading...</div>;

  if (status === "successful")
    return (
      <div className="w-5/6">
        <h4 className="m-5 text-xl font-bold">{name}</h4>
        {lessonPageItems.page && (
          <div>
            <div className="m-5 font-bold">{lessonPageItems.page.title}</div>
            <div className="m-5">{parse(lessonPageItems.page.contents)}</div>
          </div>
        )}
        {lessonPageItems.page.typestring == "Список разделов" &&
          lessonPageItems.answers && (
            <div className="flex">
              {lessonPageItems.answers.map(
                (answer: LessonPageAnswersI, id: number) => (
                  <button
                    key={id}
                    className="mx-4 px-4 py-2 rounded-xl bg-blue-300"
                    onClick={() => handleClickNextPage(answer.jumpto)}
                  >
                    {answer.answer}
                  </button>
                )
              )}
            </div>
          )}
        {lessonPageItems.page.typestring == "Множественный выбор" &&
          lessonPageItems.answers && (
            <div className="flex flex-col">
              {lessonPageItems.answers.map((answer: any, id: number) => (
                <label className="flex mx-16">
                  <input className="mx-3" type="radio" key={id} />
                  {parse(answer.answer)}
                </label>
              ))}
            </div>
          )}
        {lessonPageItems.page.typestring == "На соответствие" &&
          lessonPageItems.answers && (
            <div className="flex flex-col">
              {lessonPageItems.answers.map((answer: any, id: number) => (
                <label className="flex mx-16">
                  <input className="mx-3" type="radio" key={id} />
                  {parse(answer.answer)}
                </label>
              ))}
            </div>
          )}
      </div>
    );
};
