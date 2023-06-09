export const QuizMultichoiceController = ({ props, attemptDataBody, type }) => {
  const answerArray: string[] = [];
  let variantsArray = [];

  const multichoicePart1 = attemptDataBody.getElementsByClassName(`r0`).length;
  const multichoicePart2 = attemptDataBody.getElementsByClassName(`r1`).length;
  const choiceLength = multichoicePart1 + multichoicePart2;
  let answer = attemptDataBody.getElementsByClassName(`answer`)[0].outerHTML;
  answer = new DOMParser().parseFromString(answer, "text/html");

  if (type === "multichoice") {
    for (let i = 0; i < choiceLength; i++) {
      const choiceText = answer?.getElementById(
        `q${props.attemptid}:${props.page + 1}_answer${i}_label`
      ).innerText;
      answerArray[i] = choiceText;
    }
    variantsArray = Object.keys(answerArray).map(function (key) {
      return answerArray[key];
    });
  }
  if (type === "truefalse") {
    const choiceText = answer?.getElementsByClassName(`ml-1`);
    answerArray[0] = choiceText[0].innerText;
    answerArray[1] = choiceText[1].innerText;

    variantsArray = Object.keys(answerArray).map(function (key) {
      return answerArray[key];
    });
  }

  return {
    variantsArray,
  };
};
