import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetSurveyContentQuery } from "../../services/api/api.service";
import { Article } from "../../shared/Article/Article";

export interface Survey {
  id: number;
  text: string;
  type: number;
}

export const SurveyPage = () => {
  const [questions, setQuestions] = useState<any>();
  const [variants, setVariants] = useState<any>();

  const { state } = useLocation();
  const { id } = state;

  const { data: survey, isLoading, isSuccess } = useGetSurveyContentQuery(id);

  if (isLoading) return <div>Loading</div>;

  if (isSuccess) {
    console.log(questions, variants);
    return (
      <>
        <button
          onClick={() => divideByType(survey)}
          className="m-2 px-5 py-2 w-20 rounded-xl text-white bg-blue-600"
        >
          click
        </button>

        {survey.map((row: Survey[], id: number) => (
          <div
            key={id}
            className="flex flex-col content-center my-2 cursor-pointer"
          >
            {row.type === 2 && (
              <div className="text-xl font-bold"> {row.text}</div>
            )}
            {row.type === 1 && <div> {row.text}</div>}
          </div>
        ))}
      </>
    );
  }
};
