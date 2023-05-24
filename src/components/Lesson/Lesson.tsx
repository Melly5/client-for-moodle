import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
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
  const [startPage, setStartPage] = useState<number>(0);

  const fetchData = () => {
    let apiStartPage = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_lesson_get_pages&moodlewsrestformat=json&lessonid=${lesson.instance}`;

    const fetchStartPageData = async () => {
      const result = await axios(apiStartPage);
      setStartPage(result.data.pages[0].page.id);
      console.log(startPage);
    };
    fetchStartPageData();
  };

  const handleClick = () => {
    navigate(`/lesson/${lesson.id}`, {
      state: {
        name: lesson.name,
        instance: lesson.instance,
        startPage,
      },
    });
  };

  useEffect(fetchData, []);

  return (
    <div className=" flex">
      <ClipboardDocumentIcon className="h-6 w-6 mr-3" aria-hidden="true" />
      <div onClick={handleClick}>{lesson.name}</div>
    </div>
  );
};
