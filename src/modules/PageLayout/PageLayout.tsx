import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const PageLayout = ({ children }: any) => {
  let navigate = useNavigate();

  return (
    <div className="felx flex-col w-5/6">
      <div className="flex content-center cursor-pointer hover:text-blue-500">
        <ArrowLongLeftIcon className="h-6 w-6" aria-hidden="true" />
        <button onClick={() => navigate(-1)}>Вернуться</button>
      </div>
      <div>{children}</div>
    </div>
  );
};
