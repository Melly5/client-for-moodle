import { useParams, useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import { useGetQuizAttemptDataQuery } from "../QuizPage.api";

export const QuizAttemptPage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const { state } = useLocation();
  const { props, pageLast } = state;

  const { data: attemptData } = useGetQuizAttemptDataQuery(props);

  const navigateToPage = (num: number) => {
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
    navigate(`/review/${props.attemptid}`, {
      state: {},
    });
  };

  return (
    <div>
      hey
      {attemptData &&
        attemptData.questions?.map((question: any, id: number) => (
          <div key={id}>{parse(question.html)}</div>
        ))}
      <div>
        <button
          className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
          onClick={() => navigateToPage(-1)}
        >
          Перейти к предыдущему вопросу
        </button>
        {pageLast == Number(id) ? (
          <button
            className="my-2 px-3 py-2  text-white rounded-xl bg-blue-500"
            onClick={() => navigateToPage(1)}
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
    </div>
  );
};
