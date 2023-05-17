import { useParams } from "react-router-dom";

type Props = {};

export const ForumPage = (props: Props) => {
  const params = useParams();
  console.log(params);
  return <div>ForumItem</div>;
};
