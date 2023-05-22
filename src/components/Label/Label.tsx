import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

export const Label = (folder: any) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <ClipboardDocumentIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div>{parse(folder.description)}</div>
    </div>
  );
};
