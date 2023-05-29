import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { Service } from "../../utils/api/requests";

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
  const { id, courseid } = state;

  const [pageContent, setPageContent] = useState<PageContent>(InitialState);

  async function getWebpageContent() {
    try {
      const response = await Service.getWebpageContent(courseid);
      getPageContent(response.data.pages);
    } catch (error) {
      console.error(error);
    }
  }

  const getPageContent = (data: PageContent[]) => {
    data.map((item: PageContent) => {
      item.id === id && setPageContent(item);
    });
  };

  useEffect(() => {
    getWebpageContent();
  }, []);

  console.log(pageContent);

  return (
    <>
      <div>{pageContent.name}</div>
      <div>{parse(pageContent.content)}</div>
    </>
  );
};
