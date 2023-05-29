import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

export const Label = (folder: any) => {
  return (
    <div className="flex flex-col">
      <div>{parse(folder.description)}</div>
    </div>
  );
};
