import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

export interface PageContent {
  id: number;
  name: string;
  timemodified: number;
  content: string;
}

const InitialState: PageContent = {
  id: 0,
  name: "",
  timemodified: 0,
  content: "",
};

export const WebpagePage = () => {
  const { state } = useLocation();
  const { id } = state;

  const [pageContent, setPageContent] = useState<PageContent>(InitialState);

  useEffect(() => {
    let apiUrl = `https://dev.online.tusur.ru/moodle/webservice/rest/server.php?wstoken=2b8e54a638f0422b6859f223fa0a086e&wsfunction=mod_page_get_pages_by_courses&moodlewsrestformat=json&courseids[0]=3`;

    axios.get(apiUrl).then((response) => {
      console.log(response.data.pages);
      getPageContent(response.data.pages);
    });
  }, []);

  console.log(pageContent);

  const getPageContent = (data: PageContent[]) => {
    data.map((item: PageContent) => {
      item.id === id && setPageContent(item);
    });
  };

  return (
    <>
      <div>{pageContent.name}</div>
      <div>{parse(pageContent.content)}</div>
    </>
  );
};
