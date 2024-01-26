import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import wait from "../assets/Gear-0.2s-200px.gif";
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
  const [time, setTime] = useState(20);

  useEffect(() => {
    // Decrease the timer every second
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    // Clear the interval when the component unmounts or when seconds reach 0
    return () => clearInterval(intervalId);
  }, []);

  console.log(time);

  if (submitted) {
    return (
      <div className="bg-black h-screen flex flex-col justify-center items-center gap-y-5 text-white">
        <img height={200} src={wait} alt="sdds" />
      </div>
    );
  }

  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center gap-y-5 text-white">
      <div className="absolute right-10 top-10 h-16 w-16 flex justify-center items-center bg-white text-black rounded-full">
        {time}
      </div>
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
        <div className="flex justify-center w-full mt-4 text-white">
          <button
            className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
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
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <span className="relative text-white">Sumit</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
