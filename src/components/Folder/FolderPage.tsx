import { useParams } from "react-router-dom";

type Props = {};

export const FolderPage = (props: Props) => {
  const params = useParams();
  console.log(params);
  return <div>FolderItem</div>;
};
