import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetQuizAttemptDataQuery } from "../QuizPage.api";
import {
  QuizSaveAttemptDataProps,
  useLazyGetQuizSaveAttemptDataQuery,
} from "./QuizAttempt.api";
import { QuizMultichoice } from "./QuestionType/Multichoice/QuizMultichoice.component";
import {
  QuizInfoController,
  QuizTypeController,
  useQuizInfoController,
  useQuizTypeController,
} from "./QuestionType/QuestionType.controller";
import {
  QuizMultichoiceController,
  useQuizMultichoiceController,
} from "./QuestionType/Multichoice/QuizMultichoice.controller";

export const QuizAttemptPage = () => {
  const [data, setData] = useState(-1);

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const { state } = useLocation();
  const { props, pageLast } = state;

  const { data: attemptData, isLoading } = useGetQuizAttemptDataQuery(props);
  const [triggerSave, results] = useLazyGetQuizSaveAttemptDataQuery();

  const navigateToPage = (num: number) => {
    savePageData();
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
    savePageData();
    navigate(`/review/${props.attemptid}`);
  };

  const savePageData = async () => {
    const attemptData: QuizSaveAttemptDataProps = {
      attemptid: props.attemptid,
      questionid: props.page,
      name: `q${props.attemptid}:${props.page + 1}_answer`,
      value: data.toString(),
    };
    await triggerSave(attemptData);
    results.status === "fulfilled" && console.log(results);
  };

  const handleChange = (value) => {
    setData(value);
  };
  if (isLoading) return <div>Loading...</div>;
  if (attemptData) {
    const {
      attemptDataBody,
      questionText,
      stateText,
      grade,
      questionName,
      descriptionName,
    } = QuizInfoController(attemptData);
    const { type } = QuizTypeController(attemptDataBody);
    let variants = [];
    if (type === "multichoice" || type === "truefalse") {
      const { variantsArray } = QuizMultichoiceController({
        props,
        attemptDataBody,
        type,
      });
      variants = variantsArray;
    }

    return (
      <div>
        {attemptData &&
          attemptData.questions?.map((question: any, id: number) => (
            <div key={id} id="myDiv" className="flex  justify-center">
              <div className="m-3 p-5 w-1/4 h-1/2 bg-gray-100 rounded-lg">
                <div className="text-lg font-medium">{questionText}</div>
                <div>{stateText}</div>
                <div>{grade}</div>
                <div>Отметить вопрос</div>
              </div>

              <div className="m-3 p-5 w-2/4 h-1/2 bg-gray-100 rounded-lg">
                <div className="text-2xl font-medium">{questionName}</div>
                <div>{descriptionName}</div>
                <QuizMultichoice
                  answerArray={variants}
                  onSelectRadio={handleChange}
                  data={data}
                />
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
          onClick={() => savePageData()}
        >
          Отправить на сохранение
        </button>
      </div>
    );
  }
};
