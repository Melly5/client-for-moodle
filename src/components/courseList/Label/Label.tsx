import parse from "html-react-parser";

export const Label = (folder: any) => {
  return (
    <div className="flex flex-col">
      <div>{parse(folder.description)}</div>
    </div>
  );
};
