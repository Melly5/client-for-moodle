export interface File {
  filename: string;
  filepath: string;
  filesize: number;
  fileurl: string;
  isexternalfile: boolean;
  mimetype: string;
  timemodified: number;
}

export interface Date {
  label: string;
  timestamp: number;
  dataid: string;
}
