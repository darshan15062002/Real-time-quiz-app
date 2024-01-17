import { useState } from "react";
import { Socket } from "socket.io-client";

export const Question = ({
  quizData,
  socket,
  userId,
  problemId,
  roomId,
}: {
  quizData: {
    title: string;
    options: { title: string; id: number }[];
  };
  socket: Socket;
  roomId: string;
  userId: string;
  problemId: string;
}) => {
  // question = {
  //   title: "sf",
  //   description: "dsfsdf",
  //   options: [
  //     { id: 0, title: "sfs" },
  //     { id: 1, title: "esdfs" },
  //     { id: 2, title: "sfse" },
  //     { id: 3, title: "sfs" },
  //   ],
  //   answer: 0,
  //   id: "1",
  //   startTime: 1705497535708,
  //   submissions: [],
  // };

  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState(9);

  if (submitted) {
    return (
      <div className="bg-black h-screen flex flex-col justify-center items-center gap-y-5 text-white">
        wait for time to end ...
      </div>
    );
  }

  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center gap-y-5 text-white">
      <div className="w-52 gap-y-2 flex flex-col">
        <h1 className=" mb-3 text-start">{quizData.title}</h1>
        {quizData.options?.map((o, index) => (
          <div className="flex gap-x-3  w-full py-2 px-3 rounded-sm  bg-slate-800 text-white ">
            <input
              type="radio"
              checked={index === submission}
              onChange={() => setSubmission(index)}
              name=""
              id=""
            />
            <h3>{o.title}</h3>
          </div>
        ))}
        <div className="flex justify-between w-full mt-4 text-white">
          <button
            className="py-3 px-10 bg-indigo-600 rounded-lg mx-8"
            disabled={submitted}
            onClick={() => {
              setSubmitted(true);
              socket.emit("submit", {
                userId,
                problemId,
                submission: Number(submission),
                roomId,
              });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
