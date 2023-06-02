import { useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const AddForumDiscussion = lazy(
  () => import("./components/AddForum/AddForumDiscussion")
);

import TimeParser from "../../shared/Time/Time";

import { useGetForumDiscussionsQuery } from "../../services/api";

export const ForumPage = () => {
  const { state } = useLocation();
  const { id, name } = state;

  let navigate = useNavigate();

  const {
    data: discussionItems,
    isLoading,
    isSuccess,
  } = useGetForumDiscussionsQuery(id);

  return (
    <div>
      <Article>{name}</Article>
      <Suspense
        fallback={<p className="font-bold text-2xl mb-5">Загрузка формы...</p>}
      >
        <AddForumDiscussion id={id} />
      </Suspense>
      {isLoading && (
        <div className="font-bold text-2xl ">Загрузка обсуждений...</div>
      )}

      {isSuccess && (
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
