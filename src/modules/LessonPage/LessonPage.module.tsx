import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import {
  LessonPageAnswersI,
  LessonProps,
  useGetLessonPageContentQuery,
} from "../../services/api/api.service";
import { Article } from "../../shared/Article/Article";

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
          startPage: lessonPageItems?.page.nextpageid,
        },
      });
    jump === -40 &&
      navigate(`/lesson/${id + 1}`, {
        state: {
          id,
          name,
          instance,
          startPage: lessonPageItems?.page.prevpageid,
        },
      });
  };

  let props: LessonProps = {
    lessonid: instance,
    startpageid: startPage,
  };

  const { data: lessonPageItems, isLoading } =
    useGetLessonPageContentQuery(props);

  return (
    <>
      {isLoading ? (
        <div className="font-bold text-2xl">Loading...</div>
      ) : (
        <div className="w-5/6">
          <Article>{name}</Article>
          {lessonPageItems?.page && (
            <div>
              <div className="m-5 font-bold">{lessonPageItems.page.title}</div>
              <div className="m-5 textItem">
                {parse(lessonPageItems.page.contents)}
              </div>
            </div>
          )}
          {lessonPageItems?.page.typestring == "Список разделов" &&
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
          {lessonPageItems?.page.typestring == "Множественный выбор" &&
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
          {lessonPageItems?.page.typestring == "На соответствие" &&
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
      )}
    </>
  );
};
