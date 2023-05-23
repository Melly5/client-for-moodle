import { useLocation, useNavigate } from "react-router-dom";

export const LessonPage = () => {
  const { state } = useLocation();
  const { name, instance } = state;

  return (
    <div className="w-5/6">
      {name}
      <div> {instance}</div>
    </div>
  );
};
