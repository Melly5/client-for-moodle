import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Survey = (survey: any) => {
  const navigate = useNavigate();

  return (
    <div className=" flex">
      <QuestionMarkCircleIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div
        onClick={() =>
          navigate(`/survey/${survey.id}`, {
            state: { id: survey.instance },
          })
        }
      >
        {survey.name}
      </div>
    </div>
  );
};
