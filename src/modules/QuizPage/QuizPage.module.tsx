import { useLocation, useNavigate } from "react-router-dom";

import { Article } from "../../shared/components/Article/Article";
import {
  QuizAttemptProps,
  useGetQuizAccessInformationQuery,
} from "./QuizPage.api";

import { useQuizAttemptPageController } from "./Attempt/QuizAttempt.controller";

export const QuizPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, name } = state;

  const { data: quizAccessInfo } = useGetQuizAccessInformationQuery(id);

  const { product, handleClick } = useQuizAttemptPageController(id);

  const navigateToPage = (attempt: any) => {
    const layout = attempt.layout.split(",").map(Number);
    const pageLast = Math.max(...layout);

    const props: QuizAttemptProps = {
      attemptid: attempt.id,
      page: 0,
    };

    navigate(`/quizpage/1`, {
      state: { props, pageLast },
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

      {product.data?.attempt?.id ? (
        <div>
          <button
            className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
            onClick={() => navigateToPage(product.data?.attempt)}
          >
            Перейти к тесту
          </button>
        </div>
      ) : (
        <button
          className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
          onClick={() => handleClick()}
        >
          Начать попытку
        </button>
      )}
    </div>
  );
};
