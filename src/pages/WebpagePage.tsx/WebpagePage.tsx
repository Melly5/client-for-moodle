import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

import {
  PageContent,
  useGetWebpageContentQuery,
} from "../../redux/slices/apiSlice";
import { Article } from "../../components/Article/Article";

export const WebpagePage = () => {
  const { state } = useLocation();
  const { id, courseid } = state;

  const {
    data: webpageContent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWebpageContentQuery(courseid);

  const getPageContent = (data: any, id: number) => {
    const temp = data.filter((item: PageContent) => item.id === id);
    return temp[0];
  };

  if (isError) return <div>Error: {error.toString()}</div>;

  if (isLoading) return <div className="font-bold text-2xl">Loading...</div>;

  if (isSuccess) {
    let pageContent = getPageContent(webpageContent, id);
    return (
      <>
        <Article>{pageContent.name}</Article>
        <div>{parse(pageContent.content)}</div>
      </>
    );
  }
};
