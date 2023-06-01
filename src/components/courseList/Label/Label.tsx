import parse from "html-react-parser";

const Label = (folder: any) => {
  return (
    <div className="flex flex-col">
      <div>{parse(folder.description)}</div>
    </div>
  );
};
export default Label;
