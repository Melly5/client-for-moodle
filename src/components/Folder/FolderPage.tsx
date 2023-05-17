import { useLocation, useParams } from "react-router-dom";

export const FolderPage = () => {
  const { state } = useLocation();
  const { name, content } = state;

  return (
    <div>
      {name}
      <div>
        {content.map((content: any) => (
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
