import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

export const LessonPage = () => {
  const { state } = useLocation();
  const { name, instance } = state;
  const [lessonPage, setLessonPage] = useState<any[]>([]);
  const [startPage, setStartPage] = useState<any[]>([]);

  useEffect(() => {
    let apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_lesson_get_page_data&moodlewsrestformat=json&lessonid=${instance}&pageid=${startPage}`;
    let apiUrl1 = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_lesson_get_pages&moodlewsrestformat=json&lessonid=${instance}`;
    axios.get(apiUrl).then((resp) => {
      const data = resp.data;
      setLessonPage(data);
    });
    axios.all([axios.get(apiUrl1), axios.get(apiUrl)]).then(
      axios.spread((Start, Page) => {
        getAssign(Assign.data.courses[0].assignments);
        setSubmission();
      })
    );
  }, []);
  console.log(lessonPage);
  return (
    <div className="w-5/6">
      {name}
      <div> {instance}</div>
    </div>
  );
};
