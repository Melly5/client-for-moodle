import parse from "html-react-parser";

export const QuizMultichoice = ({ answerArray, data, onSelectRadio }) => {
  return (
    <div className="px-6">
      {answerArray &&
        answerArray.map((item: string, id: number) => (
          <span
            key={id}
            className="flex pt-3"
            onClick={() => onSelectRadio(id)}
          >
            <input
              type="radio"
              className="mr-3"
              value="Coffee"
              checked={data === id}
              onChange={() => onSelectRadio(id)}
            />
            <div>{parse(item)}</div>
          </span>
        ))}
    </div>
  );
};
