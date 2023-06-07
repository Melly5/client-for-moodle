import SimpleDateTime from "react-simple-timestamp-to-date";
import { renderToString } from "react-dom/server";
import { Suspense } from "react";

export interface Time {
  timestamp: number;
  type: TimeType;
}
export type TimeType = "days" | "minutes" | "seconds";
export interface arrayTime {
  arrDate: number[];
  arrTime: string[];
}

const TimeParser = ({ timestamp, type }: Time) => {
  let arrDate: number[] = [];
  let arrTime: string[] = [];
  let data = renderToString(<SimpleDateTime>{timestamp}</SimpleDateTime>);

  arrDate = data.split(" ").slice(0, 3).map(Number);
  arrTime = data.split(" ").slice(3, 6);

  return (
    <Suspense fallback={<p>loading</p>}>
      {type === "days" && <TimeUpToDays {...arrDate} />}
      {type === "minutes" && (
        <TimeUpToMinutes arrDate={arrDate} arrTime={arrTime} />
      )}
      {type === "seconds" && (
        <TimeUpToSeconds arrDate={arrDate} arrTime={arrTime} />
      )}
    </Suspense>
  );
};
export default TimeParser;

let days = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];
let months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const TimeUpToMinutes = ({ arrDate, arrTime }: arrayTime) => {
  return (
    <span>
      {days[arrDate[2]]} {arrDate[2]} {months[arrDate[1]]} {arrDate[0]}{" "}
      {arrTime[0]}:{arrTime[1]}
    </span>
  );
};

export const TimeUpToSeconds = ({ arrDate, arrTime }: arrayTime) => {
  return (
    <span>
      {days[arrDate[2]]} {arrDate[2]} {months[arrDate[1]]} {arrDate[0]}{" "}
      {arrTime[0]}:{arrTime[1]}:{arrTime[2]}
    </span>
  );
};

export const TimeUpToDays = (arrDate: number[]) => {
  return (
    <span>
      {days[arrDate[2]]} {arrDate[2]} {months[arrDate[1]]} {arrDate[0]}
    </span>
  );
};
