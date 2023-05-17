import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Forum = (forum: any) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <ChatBubbleLeftRightIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div
        onClick={() =>
          navigate(`/forum/${forum.id}`, {
            state: { id: forum.instance, name: forum.name },
          })
        }
      >
        {forum.name}
      </div>
    </div>
  );
};
