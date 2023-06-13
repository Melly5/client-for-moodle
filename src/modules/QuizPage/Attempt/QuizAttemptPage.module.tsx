import { useParams, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { useGetQuizAttemptDataQuery } from "../QuizPage.api";
import {
  QuizSaveAttemptDataProps,
  useLazyGetQuizFinishAttemptQuery,
  useLazyGetQuizProcessAttemptQuery,
  useLazyGetQuizSaveAttemptDataQuery,
} from "./QuizAttempt.api";
import { QuizMultichoice } from "./QuestionType/Multichoice/QuizMultichoice.component";
import {
  QuizInfoController,
  QuizTypeController,
} from "./QuestionType/QuestionType.controller";
import { QuizMultichoiceController } from "./QuestionType/Multichoice/QuizMultichoice.controller";
import { QuizNumerical } from "./QuestionType/Numerical/QuizNumerical.component";
import Timer from "../../../shared/components/Timer/Timer";

export const QuizAttemptPage = () => {
  const [data, setData] = useState("");

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const { state } = useLocation();
  const { props, pageLast } = state;

  const {
    data: attemptData,
    isLoading,
    isSuccess,
  } = useGetQuizAttemptDataQuery(props);
  const [triggerSave, results] = useLazyGetQuizSaveAttemptDataQuery();
  const [triggerProcess, processResults] = useLazyGetQuizProcessAttemptQuery();
  const [triggerFinish, finishResults] = useLazyGetQuizFinishAttemptQuery();

  const navigateToPage = (num: number) => {
    savePageData();
    setData("");
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
    finishPageData();
    navigate(`/review/${props.attemptid}`);
    setData("");
  };

  const savePageData = () => {
    const attemptData: QuizSaveAttemptDataProps = {
      attemptid: props.attemptid,
      questionid: props.page,
      name: `q${props.attemptid}:${props.page + 1}_answer`,
      value: data,
    };
    triggerProcess(attemptData);
    processResults.status === "fulfilled" && console.log(processResults);
  };

  const finishPageData = () => {
    const attemptData: QuizSaveAttemptDataProps = {
      attemptid: props.attemptid,
      questionid: props.page,
      name: `q${props.attemptid}:${props.page + 1}_answer`,
      value: data,
    };
    triggerFinish(attemptData);
    finishResults.status === "fulfilled" && console.log(finishResults);
  };

  const handleChange = (value) => {
    setData(value);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isSuccess) {
    const { attemptDataBody, questionText, stateText, grade, descriptionName } =
      QuizInfoController(attemptData);
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
    const deadline = "December, 31, 2023";
    return (
      <div>
        <Timer deadline={deadline} />
        {attemptData &&
          attemptData.questions?.map((question, id: number) => (
            <div key={id} id="myDiv" className="flex  justify-center">
              <div className="m-3 p-5 w-1/4 h-1/2 bg-gray-100 rounded-lg">
                <div className="text-lg font-medium">{questionText}</div>
                <div>{stateText}</div>
                <div>{grade}</div>
                <div>Отметить вопрос</div>
              </div>

              <div className="m-3 p-5 w-2/4 h-1/2 bg-gray-100 rounded-lg">
                <div className="text-2xl font-medium">{descriptionName}</div>
                {(type === "multichoice" || type === "truefalse") && (
                  <QuizMultichoice
                    answerArray={variants}
                    onSelectRadio={handleChange}
                    data={data}
                  />
                )}
                {type === "numerical" && (
                  <QuizNumerical onInput={handleChange} data={data} />
                )}
                {type === "shortanswer" && (
                  <QuizNumerical onInput={handleChange} data={data} />
                )}
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
