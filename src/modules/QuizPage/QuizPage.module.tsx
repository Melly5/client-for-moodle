import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from "axios";

import { Article } from "../../shared/Article/Article";
import {
  useGetQuizAccessInformationQuery,
  useGetQuizStartAttemptQuery,
} from "../../services/api/api.service";

export const QuizPage = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { id, name } = state;

  const {
    data: quizAccessInfo,
    isLoading,
    isSuccess,
  } = useGetQuizAccessInformationQuery(id);

  const { data: quizAttemptInfo } = useGetQuizStartAttemptQuery(id);
  console.log(quizAttemptInfo);
  const startAttemptOnClick = () => {
    navigate(`/quizpage/${quizAttemptInfo.attempt.currentpage}`, {
      state: { id: quizAttemptInfo.id },
    });
  };

  return (
    <div>
      <Article>{name}</Article>
      <div>
        {quizAccessInfo?.accessrules.map((question: any, id: number) => (
          <div key={id}>{question}</div>
        ))}
      </div>
      <button
        className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
        onClick={startAttemptOnClick}
      >
        Начать попытку
      </button>
    </div>
  );
};
