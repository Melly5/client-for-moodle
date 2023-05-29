import { useLocation } from "react-router-dom";
import { FileItem } from "../../components/File/File";

export const FolderPage = () => {
  const { state } = useLocation();
  const { name, content } = state;

  return (
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
  );
};
