import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { AddForumDiscussion } from "../../components/Discussion/AddForumDiscussion";
import { TimeParser } from "../../components/Time/Time";
import { Service } from "../../utils/api/requests";

export const ForumPage = () => {
  const [discussions, setDiscussions] = useState<any[]>([]);

  const { state } = useLocation();
  const { id, name } = state;

  let navigate = useNavigate();

  async function getForumDiscussions() {
    try {
      const response = await Service.getForumDiscussions(id);
      setDiscussions(response.data.discussions);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getForumDiscussions();
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
                    <TimeParser timestamp={discussion.created} type="days" />
                  </div>
                </td>
                <td className="px-6 py-4 ">
                  {" "}
                  <div>{discussion.usermodifiedfullname}</div>
                  <div>
                    <TimeParser
                      timestamp={discussion.timemodified}
                      type="days"
                    />
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
