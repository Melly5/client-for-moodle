import { useLocation, useNavigate } from "react-router-dom";

export const LessonPage = () => {
  const { state } = useLocation();
  const { name, content } = state;
  let navigate = useNavigate();
  return (
    <div className="w-5/6">
      {name}
      <div>lesson</div>
      <button className="btn" onClick={() => navigate(-1)}>
        Вернуться
      </button>
    </div>
  );
};
