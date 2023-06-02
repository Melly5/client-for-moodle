import parse from "html-react-parser";

const Label = (folder: any) => {
  return (
    <div className="textItem flex flex-col hover:cursor-default">
      <div> {parse(folder.description)}</div>
    </div>
  );
};
export default Label;
