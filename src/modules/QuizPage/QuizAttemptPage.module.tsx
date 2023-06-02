import { useLocation, useParams } from "react-router-dom";

import { useGetQuizAttemptDataQuery } from "../../services/api/api.service";

export const QuizAttemptPage = () => {
  const params = useParams();
  console.log(params);
  let id = params.id as string;

  const {
    data: quizAccessInfo,
    isLoading,
    isSuccess,
  } = useGetQuizAttemptDataQuery(id);

  return <div>hey</div>;
};
