import { useLocation, useNavigate } from "react-router-dom";

import { Article } from "../../shared/components/Article/Article";
import { QuizStartAttempt } from "./QuizPage.types";
import {
  useGetQuizAccessInformationQuery,
  useLazyGetQuizStartAttemptQuery,
} from "./QuizPage.api";

export const QuizPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, name } = state;

  const { data: quizAccessInfo } = useGetQuizAccessInformationQuery(id);

  const [triggerStartAttempt, { data: quizStartAttemptInfo }] =
    useLazyGetQuizStartAttemptQuery(id);

  const startAttemptOnClick = (quizStartAttemptInfo: QuizStartAttempt) => {
    triggerStartAttempt();
    navigate(`/quizpage/${quizStartAttemptInfo.attempt.currentpage}`, {
      state: { id: quizStartAttemptInfo.id },
    });
  };

  return (
    <div>
      <Article>{name}</Article>
      <div>
        {quizAccessInfo?.accessrules.map((rule: string, id: number) => (
          <div key={id}>{rule}</div>
        ))}
      </div>
      <button
        className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
        onClick={() => startAttemptOnClick(quizStartAttemptInfo)}
      >
        Начать попытку
      </button>
    </div>
  );
};
