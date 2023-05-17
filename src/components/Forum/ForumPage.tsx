import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

export const ForumPage = () => {
  const [discussions, setDiscussions] = useState<any[]>([]);
  const { state } = useLocation();
  const { id, name } = state;

  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_forum_get_forum_discussions&moodlewsrestformat=json&forumid=${id}`;
    setTimeout(() => {
      axios.get(apiUrl).then((resp) => {
        const data = resp.data;
        setDiscussions(data.discussions);
      });
    });
  }, []);

  console.log(discussions);
  return (
    <div>
      <div>{name}</div>
      <div>
        {discussions.map((discussion: any) => (
          <div>
            <div>{discussion.name}</div>
            <div>{parse(discussion.message)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
