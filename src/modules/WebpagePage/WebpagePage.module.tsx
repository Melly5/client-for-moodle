import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

import { Article } from "../../shared/Article/Article";
import {
  PageContent,
  useGetWebpageContentQuery,
} from "../../redux/slices/apiSlice";

export const WebpagePage = () => {
  const { state } = useLocation();
  const { id, courseid } = state;

  const {
    data: webpageContent,
    isLoading,
    isSuccess,
  } = useGetWebpageContentQuery(courseid);

  const getPageContent = (data: any, id: number) => {
    const temp = data.filter((item: PageContent) => item.id === id);
    return temp[0];
  };

  if (isSuccess) {
    let pageContent = getPageContent(webpageContent, id);
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
