import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import SimpleDateTime from "react-simple-timestamp-to-date";

export const Assign = (assign: any) => {
  let navigate = useNavigate();

  return (
    <div
      className="p-4 text-white bg-blue-500 rounded-xl cursor-pointer"
      onClick={() =>
        navigate(`/assign/${assign.id}`, {
          state: { id: assign.contextid },
        })
      }
    >
      <div className=" flex">
        <ArrowUpOnSquareIcon className="h-6 w-6 mr-3" aria-hidden="true" />

        {assign.name}
      </div>
      <div className="flex flex-col">
        {assign.dates.map((date: any, id: number) => (
          <div key={id}>
            {date.label} <SimpleDateTime>{date.timestamp}</SimpleDateTime>
          </div>
        ))}
      </div>
    </div>
  );
};
