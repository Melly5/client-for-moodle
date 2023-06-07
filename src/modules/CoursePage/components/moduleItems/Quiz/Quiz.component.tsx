import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Quiz = (quiz: any) => {
  const navigate = useNavigate();

  return (
    <div className=" flex">
      <ChatBubbleLeftRightIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div
        onClick={() =>
          navigate(`/quiz/${quiz.id}`, {
            state: { id: quiz.instance, name: quiz.name },
          })
        }
      >
        {quiz.name}
      </div>
    </div>
  );
};
export default Quiz;
