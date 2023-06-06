import { useLocation } from "react-router-dom";
import { UrlProps, useGetUrlInfoQuery } from "./UrlPage.api";
import { Article } from "../../shared/components/Article/Article";

export const UrlPage = () => {
  const { state } = useLocation();
  const { id, courseid } = state;

  const props: UrlProps = {
    urlid: id,
    courseid,
  };

  const { data: url, isLoading, isSuccess } = useGetUrlInfoQuery(props);

  if (isLoading) return <div>Loading</div>;

  if (isSuccess) {
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
