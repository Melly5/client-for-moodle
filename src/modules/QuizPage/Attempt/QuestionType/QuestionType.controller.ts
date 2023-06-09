import { useLazyGetQuizStartAttemptQuery } from "../QuizPage.api";

export const QuizInfoController = (attemptData: any) => {
  const attemptDataBody = new DOMParser().parseFromString(
    attemptData.questions[0].html,
    "text/html"
  ).body;
  const questionText = attemptDataBody.getElementsByTagName(`h3`)[0].innerText;
  const stateText =
    attemptDataBody.getElementsByClassName(`state`)[0].innerHTML;
  const grade = attemptDataBody.getElementsByClassName(`grade`)[0].innerHTML;
  const questionName = attemptDataBody.getElementsByTagName(`h4`)[0].innerText;
  const descriptionName =
    attemptDataBody.getElementsByClassName(`qtext`)[0].innerText;

  return {
    attemptDataBody,
    questionText,
    stateText,
    grade,
    questionName,
    descriptionName,
  };
};

export const QuizTypeController = (attemptDataBody: any) => {
  let type = "";
  const multichoiceType = attemptDataBody.getElementsByClassName(`multichoice`);
  const truefalseType = attemptDataBody.getElementsByClassName(`truefalse`);
  multichoiceType.length > 0 && (type = "multichoice");
  truefalseType.length > 0 && (type = "truefalse");

  return {
    type,
  };
};