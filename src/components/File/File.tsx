import { File } from "../../pages/AssignPage/AssignPage";

export const FileItem = (content: File) => {
  let token1 = "2b8e54a638f0422b6859f223fa0a086e";

  return (
    <div>
      <a href={`${content.fileurl}&token=${token1}`} download className="mx-3">
        {content.filename}
      </a>
    </div>
  );
};
