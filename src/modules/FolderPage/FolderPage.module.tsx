import { useLocation } from "react-router-dom";
import { Suspense } from "react";

import FileItem from "../../shared/components/File/File";
import { FolderContent } from "./FolderPage.types";

export const FolderPage = () => {
  const { state } = useLocation();
  const { name, content } = state;
  console.log(content);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="w-2/6 m-5 p-5 rounded-lg bg-gray-50">
        {name}
        <div>
          {content.map((content: FolderContent, id: number) => (
            <div key={id}>
              <FileItem {...content} />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};
