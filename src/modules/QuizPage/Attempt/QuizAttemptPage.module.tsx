import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import parse from "html-react-parser";

import { useGetQuizAttemptDataQuery } from "../QuizPage.api";

export const QuizAttemptPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const { state } = useLocation();
  const { props, pageLast } = state;

  const { data: attemptData } = useGetQuizAttemptDataQuery(props);

  const navigateToPage = (num: number) => {
    //need to handle save request

    const idNext = Number(id) + num;

    navigate(`/quizpage/${idNext}`, {
      state: {
        props: {
          attemptid: props.attemptid,
          page: props.page + num,
        },
        pageLast,
      },
    });
  };

  const navigateToReview = () => {
    //need to handle save request
    navigate(`/review/${props.attemptid}`);
  };

  if (attemptData) {
    const temp = new DOMParser().parseFromString(
      attemptData.questions[0].html,
      "text/html"
    ).body;
    const questionN = temp.getElementsByTagName(`h3`)[0].innerText;
    const stateText = temp.getElementsByClassName(`state`)[0].innerHTML;
    const grade = temp.getElementsByClassName(`grade`)[0].innerHTML;
    const questionName = temp.getElementsByTagName(`h4`)[0].innerText;
    const descriptionName = temp.getElementsByClassName(`qtext`)[0].innerText;

    const multichoicePart1 = temp.getElementsByClassName(`r0`).length;
    const multichoicePart2 = temp.getElementsByClassName(`r1`).length;
    const choiceLength = multichoicePart1 + multichoicePart2;

    let answer = temp.getElementsByClassName(`answer`)[0].outerHTML;
    answer = new DOMParser().parseFromString(answer, "text/html");
    const answerArray: string = [];
    for (let i = 0; i < choiceLength; i++) {
      const choiceText = answer?.getElementById(
        `q45:${props.page + 1}_answer${i}_label`
      ).innerText;
      answerArray[i] = choiceText;
    }

    return (
      <div>
        {attemptData &&
          attemptData.questions?.map((question: any, id: number) => (
            <div key={id} id="myDiv" className="flex  justify-center">
              <div className="m-3 p-5 w-1/4 h-1/2 bg-gray-100 rounded-lg">
                <div className="text-lg font-medium">{questionN}</div>
                <div>{stateText}</div>
                <div>{grade}</div>
                <div>Отметить вопрос</div>
              </div>
              <div className="m-3 p-5 w-2/4 h-1/2 bg-gray-100 rounded-lg">
                <div className="text-2xl font-medium">{questionName}</div>
                <div>{descriptionName}</div>
                <div className="px-6">
                  {answerArray &&
                    answerArray.map((item: string, id: number) => (
                      <span
                        key={id}
                        className="flex pt-3"
                        onClick={() => setData(id)}
                      >
                        <input
                          type="radio"
                          className="mr-3"
                          value="Coffee"
                          checked={data === id}
                        />
                        <div>{parse(item)}</div>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}

        <div className="flex justify-between">
          <button
            className="my-2 mr-4 px-3 py-2  text-white rounded-xl bg-blue-500"
            onClick={() => navigateToPage(-1)}
          >
            Перейти к предыдущему вопросу
          </button>
          {pageLast == Number(id) ? (
            <button
              className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
              onClick={() => navigateToReview()}
            >
              Завершить тест
            </button>
          ) : (
            <button
              className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
              onClick={() => navigateToPage(1)}
            >
              Перейти к следующему вопросу
            </button>
          )}
        </div>
        <button
          className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
          onClick={() => savePageData(1)}
        >
          Отправить на сохранение
        </button>
      </div>
    );
  }
};
