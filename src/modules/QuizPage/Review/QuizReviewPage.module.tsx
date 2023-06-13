import { useNavigate } from "react-router-dom";

export const QuizReviewPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="m-3 px-5 py-2 text-white bg-blue-500 rounded-lg"
        onClick={() => navigate(`/`)}
      >
        К списку курсов
      </button>
      Страница просмотра результатов
    </>
  );
};
