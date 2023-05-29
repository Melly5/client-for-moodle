import { NewspaperIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Webpage = (page: any) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <NewspaperIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div
        onClick={() =>
          navigate(`/page/${page.id}`, {
            state: {
              id: page.instance,
            },
          })
        }
      >
        {page.name}
      </div>
    </div>
  );
};
