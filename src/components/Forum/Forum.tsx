import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Forum = (module: any) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <ChatBubbleLeftRightIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div onClick={() => navigate(`/forum/${module.id}`)}>{module.name}</div>
    </div>
  );
};
//{"error":"A required parameter (token) was missing","errorcode":"missingparam","stacktrace":null,"debuginfo":null,"reproductionlink":null}
