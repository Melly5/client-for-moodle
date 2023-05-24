import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const ForumDiscussion = () => {
  const [discussion, setDiscussion] = useState<any[]>([]);
  let params = useParams();
  const { state } = useLocation();
  const { name } = state;

  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_forum_get_discussion_posts&moodlewsrestformat=json&discussionid=${params.id}`;

    axios.get(apiUrl).then((resp) => {
      const data = resp.data;

      setDiscussion(data.posts);
    });
    console.log(discussion);
  }, []);

  return (
    <div>
      <div>{name}</div>
      {discussion && (
        <div>
          {discussion.map((post: any) => (
            <div>
              {post.parentid === null && <div>parent {post.subject}</div>}
              {post.parentid && <div>child {post.subject}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
