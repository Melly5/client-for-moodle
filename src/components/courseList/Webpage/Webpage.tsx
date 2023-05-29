import { NewspaperIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export interface WebpageProps {
  page: any;
  courseid: string;
}

export const Webpage = ({ page, courseid }: WebpageProps) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <NewspaperIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div
        onClick={() =>
          navigate(`/page/${page.id}`, {
            state: {
              id: page.instance,
              courseid,
            },
          })
        }
      >
        {page.name}
      </div>
    </div>
  );
};
