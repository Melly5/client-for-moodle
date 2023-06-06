import { useParams } from "react-router-dom";

import { useGetQuizAttemptDataQuery } from "./QuizPage.api";

export const QuizAttemptPage = () => {
  const params = useParams();
  console.log(params);
  const id = params.id as string;

  const { data: quizAccessInfo } = useGetQuizAttemptDataQuery(id);

  return <div>hey</div>;
};
