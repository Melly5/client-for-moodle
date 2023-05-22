import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Resource = (folder: any) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <ClipboardDocumentIcon className="h-6 w-6 mr-3" aria-hidden="true" />

      <a
        href={`${folder.contents[0].fileurl}&token=2b8e54a638f0422b6859f223fa0a086e`}
        download
        className="mx-3"
      >
        {folder.name}
      </a>
    </div>
  );
};
