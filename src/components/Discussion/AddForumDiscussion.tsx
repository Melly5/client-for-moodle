import axios from "axios";
import { useState } from "react";

export const AddForumDiscussion = (id: any) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handlePostDiscussion = () => {
    let apiAddDiscussion = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_forum_add_discussion&moodlewsrestformat=json&forumid=${id.id}`;
    console.log(id.id, subject, message);
    axios
      .post(apiAddDiscussion, {
        subject,
        message,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /*useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(message, subject);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [subject, message]);*/

  return (
    <div className="flex flex-col my-5 p-5 w-2/6 bg-gray-50 ">
      <label className="block text-gray-700 text-sm font-bold mb-2">Тема</label>
      <input
        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Тема"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <label className="my-2 block text-gray-700 text-sm font-bold mb-2">
        Сообщение
      </label>
      <input
        className="inline-block align-top shadow appearance-none border rounded py-2 px-3 h-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className=" my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handlePostDiscussion}
      >
        Добавить
      </button>
    </div>
  );
};
