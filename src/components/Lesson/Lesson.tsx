import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export interface LessonI {
  id: number;
  instance: number;
  name: string;
  completion: number;
  completiondata: {};
  dates: [];
  url: string;
}

export const Lesson = (lesson: LessonI) => {
  let navigate = useNavigate();

  return (
    <div className=" flex">
      <ClipboardDocumentIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div
        onClick={() =>
          navigate(`/lesson/${lesson.id}`, {
            state: {
              name: lesson.name,
              instance: lesson.instance,
            },
          })
        }
      >
        {lesson.name}
      </div>
    </div>
  );
};
