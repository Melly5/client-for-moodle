export const QuizNumerical = ({ data, onInput }) => {
  return (
    <div className="flex my-4 content-center">
      <label className="mr-3">Ответ:</label>
      <input
        name="myInput"
        className="h-8 p-4 rounded-lg"
        value={data}
        onChange={(e) => onInput(e.target.value)}
      />
    </div>
  );
};
