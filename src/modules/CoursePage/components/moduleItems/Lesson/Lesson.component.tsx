import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import { Lesson as LessonI } from "../../../../LessonPage/LessonPage.types";
import {
  useGetLessonStartPageContentQuery,
  useLazyGetLessonStartPageContentQuery,
} from "../../../../LessonPage/LessonPage.api";

const Lesson = (lesson: LessonI) => {
  const navigate = useNavigate();
  /* const [triggerStartPage, { data: startPage }] =
    useLazyGetLessonStartPageContentQuery();*/
  const { data: startPage } = useGetLessonStartPageContentQuery(
    lesson.instance
  );

  const HandleClick = () => {
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
      <div onClick={HandleClick}>{lesson.name}</div>
    </div>
  );
};
export default Lesson;
