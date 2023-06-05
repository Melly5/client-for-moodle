import { LinkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export interface AssignProps {
  url: [];
  courseid: number;
}

export const Url = ({ url, courseid }: AssignProps) => {
  const navigate = useNavigate();

  return (
    <div className=" flex">
      <LinkIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div
        onClick={() =>
          navigate(`/url/${url.id}`, {
            state: { id: url.instance, courseid },
          })
        }
      >
        {url.name}
      </div>
    </div>
  );
};
