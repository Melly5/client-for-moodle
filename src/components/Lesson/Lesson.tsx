import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Lesson = (folder: any) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <ClipboardDocumentIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div
        onClick={() =>
          navigate(`/lesson/${folder.id}`, {
            state: { name: folder.name, content: folder.contents },
          })
        }
      >
        {folder.name}
      </div>
    </div>
  );
};
