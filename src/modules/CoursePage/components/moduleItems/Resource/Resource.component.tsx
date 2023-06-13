import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

export interface ResourceI {
  name: string;
  contents: FileContents[];
}

export interface FileContents {
  author: string;
  filename: string;
  filepath: string;
  filesize: number;
  fileurl: string;
  isexternalfile: boolean;
  timecreated: number;
  timemodified: number;
  type: string;
  userid: number;
}

const Resource = (resource: any) => {
  return (
    <div className=" flex">
      <ClipboardDocumentIcon className="h-6 w-6 mr-3" aria-hidden="true" />

      <a
        href={`${resource.contents[0].fileurl}&token=2b8e54a638f0422b6859f223fa0a086e`}
        download
      >
        {resource.name}
      </a>
    </div>
  );
};

export default Resource;
