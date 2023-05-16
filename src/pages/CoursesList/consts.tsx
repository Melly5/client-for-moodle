export interface Course {
  id: number;
  fullname: string;
}

export interface Users {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  department: string;
  firstaccess: number;
  lastaccess: number;
  lastcourseaccess: number;
  description: string;
  descriptionformat: number;
  profileimageurlsmall: string;
  profileimageurl: string;
  roles: [];
  preferences: [
    {
      name: string;
      value: string;
    }
  ];
  enrolledcourses: [
    {
      id: number;
      fullname: string;
      shortname: string;
    }
  ];
}
