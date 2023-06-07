export interface LessonPage {
  id: number;
  lessonid: number;
  prevpageid: number;
  nextpageid: number;
  qtype: number;
  qoption: number;
  timecreated: number;
  timemodified: number;
  title: string;
  contents: string;
  type: number;
  typeid: number;
  typestring: string;
}
export interface LessonPageAnswers {
  id: number;
  answerfiles: [];
  responsefiles: [];
  jumpto: number;
  grade: number;
  score: number;
  flags: number;
  timecreated: number;
  timemodified: number;
  answer: string;
  answerformat: number;
  response: string;
  responseformat: number;
}

export interface Lesson {
  page: LessonPage;
  answers: LessonPageAnswers[];
  messages: [];
  newpageid: number;
}
