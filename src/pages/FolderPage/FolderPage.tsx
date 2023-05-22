import { useLocation, useNavigate } from "react-router-dom";

export const FolderPage = () => {
  const { state } = useLocation();
  const { name, content } = state;
  let navigate = useNavigate();
  return (
    <div className="w-5/6">
      {name}
      <div>
        {content.map((content: any, id: number) => (
          <div key={id}>
            <a
              href={`${content.fileurl}&token=2b8e54a638f0422b6859f223fa0a086e`}
              download
              className="mx-3"
            >
              {content.filename}
            </a>
          </div>
        ))}
      </div>
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};
