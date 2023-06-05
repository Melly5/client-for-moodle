import { useParams } from "react-router-dom";

import { useGetQuizAttemptDataQuery } from "../../services/api/api.service";

export const QuizAttemptPage = () => {
  const params = useParams();
  console.log(params);
  const id = params.id as string;

  const { data: quizAccessInfo } = useGetQuizAttemptDataQuery(id);

  return <div>hey</div>;
};