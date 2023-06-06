import { FC, ReactNode } from "react";

export interface ArticleProps {
  children?: ReactNode;
}
export const Article: FC<ArticleProps> = ({ children }) => {
  return <div className="mb-5 mt-3 text-2xl font-bold">{children}</div>;
};
