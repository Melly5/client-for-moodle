import { useLazyGetQuizStartAttemptQuery } from "../QuizPage.api";

export const useQuizAttemptPageController = (quizid: number) => {
  const [triggerStartAttempt, results] = useLazyGetQuizStartAttemptQuery();

  const handleStartClick = () => {
    triggerStartAttempt(quizid);
  };

  return {
    product: {
      data: results.data,
      isLoading: results.isFetching,
    },
    handleStartClick,
  };
};
export const useQuizFinishAttemptPageController = (attemptid: number) => {
  const [triggerFinishAttempt, results] = useLazyGetQuizFinishAttemptQuery();

  const handleFinishClick = () => {
    triggerFinishAttempt(attemptid);
  };

  return {
    product: {
      data: results.data,
      isLoading: results.isFetching,
    },
    handleFinishClick,
  };
};
