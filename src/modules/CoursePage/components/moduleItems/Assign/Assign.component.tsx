import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import TimeParser from "../../../../../shared/Time/Time";

export interface AssignComponentI {
  id: number;
  name: string;
  dates: [];
  contextid: number;
  instance: number;
}

export interface AssignDate {
  label: string;
  timestamp: number;
}

export interface AssignProps {
  assign: AssignComponentI;
  courseid: number;
}

const Assign = ({ assign, courseid }: AssignProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-3/4 p-4 text-white bg-blue-500 rounded-xl cursor-pointer"
      onClick={() =>
        navigate(`/assign/${assign.id}`, {
          state: { id: assign.instance, courseid },
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
            {date.label}
            <TimeParser timestamp={date.timestamp} type={"minutes"} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Assign;
