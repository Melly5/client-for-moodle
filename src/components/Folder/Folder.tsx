import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Folder = (module: any) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <FolderOpenIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div onClick={() => navigate(`/folder/${module.id}`)}>{module.name}</div>
      <div>
        {module.contents.map((content: any) => (
          <>
            <a
              href={`${content.fileurl}&token=2b8e54a638f0422b6859f223fa0a086e`}
              download
              className="mx-3"
            >
              {content.filename}
            </a>
          </>
        ))}
      </div>
    </div>
  );
};
