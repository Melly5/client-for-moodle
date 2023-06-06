import { useLocation } from "react-router-dom";
import { useGetUrlInfoQuery } from "./UrlPage.api";
import { Article } from "../../shared/components/Article/Article";
import { UrlContent } from "./UrlPage.types";

export const UrlPage = () => {
  const { state } = useLocation();
  const { id, courseid } = state;
  let url;
  const { data, isLoading, isSuccess } = useGetUrlInfoQuery(courseid);

  const getUrl = () => {
    return data.find((item: UrlContent) => item.id === id);
  };
  if (isLoading) return <div>Loading</div>;

  if (isSuccess) {
    url = getUrl();
    console.log(url);
    return (
      <div>
        <Article>{url.name}</Article>
        <span>Нажмите на ссылку </span>
        <a href={`${url.externalurl}`} className="mx-1">
          {url.externalurl}
        </a>
        <span>, чтобы открыть ресурс.</span>
      </div>
    );
  }
};
