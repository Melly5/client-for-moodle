import React from "react";
import { useLazyGetQuizStartAttemptQuery } from "../QuizPage.api";

export const useQuizAttemptPageController = (quizid: number) => {
  const [triggerStartAttempt, results] = useLazyGetQuizStartAttemptQuery();

  const handleClick = () => {
    triggerStartAttempt(quizid);
  };

  return {
    product: {
      data: results.data,
      isLoading: results.isFetching,
    },
    handleClick,
  };
};
