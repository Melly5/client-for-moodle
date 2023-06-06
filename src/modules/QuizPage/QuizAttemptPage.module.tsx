import { useParams } from "react-router-dom";

import {
  useGetQuizAttemptDataQuery,
  useGetQuizStartAttemptQuery,
} from "./QuizPage.api";

export const QuizAttemptPage = () => {
  const params = useParams();

  const id = params.id;

  //  const { data: quizAccessInfo } = useGetQuizAttemptDataQuery(id);

  return <div>hey</div>;
};
