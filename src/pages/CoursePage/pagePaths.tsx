import { Folder } from "../../components/Folder/Folder";
import { Forum } from "../../components/Forum/Forum";
import { Assign } from "../../components/Assign/Assign";
import { Quiz } from "../../components/Quiz/Quiz";
import { Lesson } from "../../components/Lesson/Lesson";
import { Resource } from "../../components/Resource/Resource";
import { Label } from "../../components/Label/Label";

export const paths = [
  {
    name: "folder",
    icon: <Folder {...module} />,
  },
  {
    name: "forum",
    icon: <Forum {...module} />,
  },
  {
    name: "assign",
    icon: <Assign {...module} />,
  },
  {
    name: "quiz",
    icon: <Quiz {...module} />,
  },
  {
    name: "lesson",
    icon: <Lesson {...module} />,
  },
  {
    name: "resource",
    icon: <Resource {...module} />,
  },
  {
    name: "label",
    icon: <Label {...module} />,
  },
];

//const arr = [{ a: "b" }];
//console.log(arr.some((item) => item.a === "b"));
