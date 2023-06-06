import { useLocation } from "react-router-dom";

import { Article } from "../../shared/components/Article/Article";
import { useGetQuizAccessInformationQuery } from "./QuizPage.api";

export const QuizPage = () => {
  //const navigate = useNavigate();
  const { state } = useLocation();
  const { id, name } = state;

  const { data: quizAccessInfo } = useGetQuizAccessInformationQuery(id);

  //const { data: quizAttemptInfo } = useGetQuizStartAttemptQuery(id);
  /* console.log(quizAttemptInfo);
  const startAttemptOnClick = () => {
    navigate(`/quizpage/${quizAttemptInfo.attempt.currentpage}`, {
      state: { id: quizAttemptInfo.id },
    });
  };*/

  return (
    <div>
      <Article>{name}</Article>
      <div>
        {quizAccessInfo?.accessrules.map((rule: string, id: number) => (
          <div key={id}>{rule}</div>
        ))}
      </div>
      <button className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500">
        Начать попытку
      </button>
    </div>
  );
};
