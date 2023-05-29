import { File } from "../../pages/AssignPage/AssignPage";
import { TimeParser, TimeUpToMinutes } from "../Time/Time";

export const FileItem = (content: File) => {
  let token1 = "2b8e54a638f0422b6859f223fa0a086e";

  return (
    <div className=" ml-3 my-3 px-4 py-2 rounded-md bg-white hover:text-blue-600 hover:cursor-pointer">
      <a
        href={`${content.fileurl}&token=${token1}`}
        download
        className="flex justify-between  mx-3"
      >
        <span>{content.filename}</span>
        <span>
          <span className="text-xs text-gray-400">Изменено:</span>
          <span className="text-sm">
            <TimeParser timestamp={content.timemodified} type="minutes" />
          </span>
        </span>
      </a>
    </div>
  );
};
