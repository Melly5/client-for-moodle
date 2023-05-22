import { useLocation, useNavigate } from "react-router-dom";

export const ResourcePage = () => {
  const { state } = useLocation();
  const { name, content } = state;
  let navigate = useNavigate();
  return (
    <div className="w-5/6">
      {name}
      <a
        href={`${content.fileurl}&token=2b8e54a638f0422b6859f223fa0a086e`}
        download
        className="mx-3"
      >
        {content.filename}
      </a>
      <button className="btn" onClick={() => navigate(-1)}>
        Вернуться
      </button>
    </div>
  );
};
