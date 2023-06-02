import { useLocation } from "react-router-dom";
import FileItem from "../../shared/File/File";

export const ResourcePage = () => {
  const { state } = useLocation();
  const { content } = state;

  return (
    <div className="w-5/6">
      <FileItem {...content} />
    </div>
  );
};
