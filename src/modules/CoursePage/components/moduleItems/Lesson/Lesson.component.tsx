import { useNavigate } from "react-router-dom";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import { useGetLessonStartPageContentQuery } from "../../../../LessonPage/LessonPage.api";
import { Lesson as LessonI } from "../../../../LessonPage/LessonPage.types";

const Lesson = (lesson: LessonI) => {
  const navigate = useNavigate();
  const { data: startPage } = useGetLessonStartPageContentQuery(
    lesson.instance
  );

  const handleClick = () => {
    navigate(`/lesson/${lesson.id}`, {
      state: {
        id: lesson.id,
        name: lesson.name,
        instance: lesson.instance,
        startPage,
      },
    });
  };

  return (
    <div className=" flex">
      <ClipboardDocumentIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div onClick={handleClick}>{lesson.name}</div>
    </div>
  );
};
export default Lesson;
