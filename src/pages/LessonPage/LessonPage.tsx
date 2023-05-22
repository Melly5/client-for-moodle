import { useLocation, useNavigate } from "react-router-dom";

export const LessonPage = () => {
  const { state } = useLocation();
  const { name, content } = state;

  return (
    <div className="w-5/6">
      {name}
      <div>lesson</div>
    </div>
  );
};
