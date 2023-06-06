import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

import { Article } from "../../shared/components/Article/Article";
import { WebpageContent } from "./WebpagePage.types";
import { useGetWebpageContentQuery } from "./WebpagePage.api";
export const WebpagePage = () => {
  const { state } = useLocation();
  const { id, courseid } = state;

  const {
    data: webpageContent,
    isLoading,
    isSuccess,
  } = useGetWebpageContentQuery(courseid);

  const getPageContent = (data: WebpageContent[], id: number) => {
    console.log(data);
    const temp = data.filter((item: WebpageContent) => item.id === id);
    return temp[0];
  };

  if (isSuccess) {
    const pageContent = getPageContent(webpageContent, id);
    return (
      <>
        {isLoading ? (
          <div className="font-bold text-2xl">Loading...</div>
        ) : (
          <>
            <Article>{pageContent.name}</Article>
            <div className="textItem">{parse(pageContent.content)}</div>
          </>
        )}
      </>
    );
  } else return <div>Ошибка получения данных</div>;
};
