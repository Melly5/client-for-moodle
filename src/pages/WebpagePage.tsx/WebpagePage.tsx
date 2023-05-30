import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

import { AppDispatch } from "../../redux/store";
import {
  webpageProps,
  getWebpageContent,
  selectAllWebpageContent,
} from "../../redux/slices/webpageSlice";

export const WebpagePage = () => {
  const { state } = useLocation();
  const { id, courseid } = state;

  const dispatch = useDispatch<AppDispatch>();

  const webpage = useSelector(selectAllWebpageContent);
  const { webpageContent, status, error } = webpage;
  let props: webpageProps = {
    lessonid: id,
    courseid,
  };

  useEffect(() => {
    let isMounted = true;

    if (status === "idle") {
      dispatch(getWebpageContent(props));
    }
    return () => {
      isMounted = false;
    };
  }, [status, dispatch]);

  if (error !== "") return <div>Error: {error}</div>;

  return (
    <>
      <div>{webpageContent.name}</div>
      <div>{parse(webpageContent.content)}</div>
    </>
  );
};
