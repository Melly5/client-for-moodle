export interface Quiz {
  attempt: [];
  currentpage: number;
  state: string;
  messages: [];
  questions: [];
}

export interface QuizAccessInfo {
  accessrules: string[];
}

export interface QuizStartAttempt {
  id: number;
  quiz: number;
  userid: number;
  attempt: number;
  uniqueid: number;
  layout: stringnumber;
  currentpage: number;
  preview: number;
  state: stringnumber;
  timestart: number;
  timefinish: number;
  timemodified: number;
  timemodifiedoffline: number;
  timecheckstate: booleannumber;
  sumgrades: booleannumber;
  gradednotificationsenttime: boolean;
}

export interface QuizAttemptData {
  attempt: { id: number; currentpage: number };
  nextpage: number;
  questions: {
    type: string;
    page: number;
    html: string;
    status: string;
    maxmark: number;
  };
}
