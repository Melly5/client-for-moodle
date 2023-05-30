import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { AppDispatch } from "../../redux/store";
import {
  ForumDiscussion,
  getForumDiscussions,
  selectAllForumDiscussions,
} from "../../redux/slices/forumSlice";

import { AddForumDiscussion } from "../../components/Discussion/AddForumDiscussion";
import { TimeParser } from "../../components/Time/Time";

export const ForumPage = () => {
  const { state } = useLocation();
  const { id, name } = state;

  let navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const discussions = useSelector(selectAllForumDiscussions);
  const { discussionItems, status, error } = discussions;

  useEffect(() => {
    let isMounted = true;

    if (status === "idle") {
      dispatch(getForumDiscussions(id));
    }

    return () => {
      isMounted = false;
    };
  }, [status, dispatch]);

  if (error !== "") return <div>Error: {error}</div>;

  return (
    <div>
      <div className="my-5 text-lg font-bold">{name}</div>
      <AddForumDiscussion id={id} />
      {status === "loading" && (
        <div className="font-bold text-2xl">Loading...</div>
      )}

      {status === "successful" && (
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
              {discussionItems.map(
                (discussion: ForumDiscussion, id: number) => (
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
                        <TimeParser
                          timestamp={discussion.created}
                          type="days"
                        />
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
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
