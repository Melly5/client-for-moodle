import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import SimpleDateTime from "react-simple-timestamp-to-date";
import { AddForumDiscussion } from "../../components/Discussion/AddForumDiscussion";

export const ForumPage = () => {
  const [discussions, setDiscussions] = useState<any[]>([]);
  const { state } = useLocation();
  const { id, name } = state;
  let navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_forum_get_forum_discussions&moodlewsrestformat=json&forumid=${id}`;

    axios.get(apiUrl).then((resp) => {
      const data = resp.data;
      setDiscussions(data.discussions);
    });
    console.log(discussions);
  }, []);

  return (
    <div>
      <div className="my-5 text-lg font-bold">{name}</div>
      <AddForumDiscussion id={id} />
      <div className="rounded-lg">
        <table className="table-auto border border-collapse bg-gray-50">
          <thead>
            <tr className="border border-slate-300">
              <th className="px-6 py-4 text-blue-800">Обсуждение</th>
              <th className="px-6 py-4 text-blue-800">Начато</th>
              <th className="px-6 py-4 text-blue-800">Последнее сообщение</th>
              <th className="px-6 py-4 text-blue-800">Ответы</th>
            </tr>
          </thead>
          <tbody>
            {discussions.map((discussion: any, id: number) => (
              <tr key={id}>
                <td
                  className="px-6 py-4 hover:text-blue-800 cursor-pointer"
                  onClick={() =>
                    navigate(`/discussion/${discussion.id}`, {
                      state: { name: discussion.name },
                    })
                  }
                >
                  {discussion.name}
                </td>
                <td className="px-6 py-4 ">
                  <div>{discussion.userfullname}</div>
                  <div>
                    <SimpleDateTime>{discussion.created}</SimpleDateTime>
                  </div>
                </td>
                <td className="px-6 py-4 ">
                  {" "}
                  <div>{discussion.usermodifiedfullname}</div>
                  <div>
                    <SimpleDateTime>{discussion.timemodified}</SimpleDateTime>
                  </div>
                </td>
                <td className="px-6 py-4 ">{discussion.numreplies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
