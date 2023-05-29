import { Folder } from "../../components/courseList/Folder/Folder";
import { Forum } from "../../components/courseList/Forum/Forum";
import { Assign } from "../../components/courseList/Assign/Assign";
import { Quiz } from "../../components/courseList/Quiz/Quiz";
import { Lesson } from "../../components/courseList/Lesson/Lesson";
import { Resource } from "../../components/courseList/Resource/Resource";
import { Label } from "../../components/courseList/Label/Label";

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
