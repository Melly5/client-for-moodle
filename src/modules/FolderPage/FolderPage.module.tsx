import { useLocation } from "react-router-dom";
import { Suspense } from "react";

import FileItem from "@shared/File/File";

export const FolderPage = () => {
  const { state } = useLocation();
  const { name, content } = state;

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="w-2/6 m-5 p-5 rounded-lg bg-gray-50">
        {name}
        <div>
          {content.map((content: any, id: number) => (
            <div key={id}>
              <FileItem {...content} />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};
