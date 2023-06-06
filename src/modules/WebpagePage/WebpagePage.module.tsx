import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

import { Article } from "../../shared/components/Article/Article";
import { useGetWebpageContentQuery } from "./WebpagePage.api";

export const WebpagePage = () => {
  const { state } = useLocation();
  const { id, courseid } = state;

  const props: WebpageProps = {
    webpageid: id,
    courseid,
  };

  const { data: webpageContent } = useGetWebpageContentQuery(props);

  return (
    <>
      {webpageContent && (
        <>
          <Article>{webpageContent.name}</Article>
          <div className="textItem">{parse(webpageContent.content)}</div>
        </>
      )}
    </>
  );
};
