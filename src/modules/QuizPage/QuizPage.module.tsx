import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from "axios";

export interface Quiz {
  attempt: [];
  currentpage: number;
  state: string;
  messages: [];
  questions: [];
}

export const QuizPage = () => {
  const [discussions, setDiscussions] = useState<Quiz>();
  const { state } = useLocation();
  const { name } = state;
  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_quiz_get_attempt_data&moodlewsrestformat=json&attemptid=2&page=0`;
    setTimeout(() => {
      axios.get(apiUrl).then((resp) => {
        const data = resp.data;
        setDiscussions(data);
      });
    });
  }, []);

  console.log(discussions);
  return (
    <div>
      <div>{name}</div>
      <div>
        {discussions?.questions.map((question: any) => (
          <div>{parse(question.html)}</div>
        ))}
      </div>
    </div>
  );
};
