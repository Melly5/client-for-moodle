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
  attempt: { id: number; currentpage: number };
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
