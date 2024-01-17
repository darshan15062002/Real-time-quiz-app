import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Question } from "../components/Question";
import { LeaderBoard } from "../components/LeaderBoard";
import { QuizNoteStarted } from "../components/QuizNotStarted";

function Home() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");

  if (!submitted) {
    return (
      <div className="h-screen flex flex-col justify-center items-center w-full bg-black">
        <form
          className="flex
      flex-col gap-y-5"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 px-4"
            type="text"
            placeholder="name"
            name=""
            id=""
          />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-2 px-4"
            type="text"
            name=""
            id=""
            placeholder="room Id"
          />
          <button
            className="bg-white p-2"
            onClick={() => {
              setSubmitted(true);
            }}
          >
            Join
          </button>
        </form>
      </div>
    );
  }

  return <UserLoggedIn code={code} name={name} />;
}

export default Home;

interface Question {
  id: string;
  title: string;
  description: string;
  options: {
    id: number;
    title: string;
  }[];
  startTime: number;
  answer: number; // Assuming the answer is a number, adjust accordingly
  submissions: string[]; // You might want to define a type for submissions as well
}

export const UserLoggedIn = ({
  code,
  name,
}: {
  code: string;
  name: string;
}) => {
  const [currentState, setCurrentState] = useState("not_started");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [socket, setSocket] = useState<null | Socket>(null);
  const [userIds, setUserId] = useState("");

  useEffect(() => {
    const _socket = io("http://localhost:3000");
    setSocket(_socket);

    _socket.on("connect", () => {
      console.log(socket?.id);
      _socket.emit("join", {
        roomId: code,
        name,
      });
    });

    _socket.on("init", ({ userId, state }) => {
      console.log(userId);

      setUserId(userId);

      if (state?.leaderboard) {
        setLeaderboard(state.leaderboard);
      }
      if (state?.problem) {
        setCurrentQuestion(state.problem);
      }

      setCurrentState(state?.type);
    });

    _socket.on("leaderboard", (data) => {
      console.log("leaderboard-87");

      setCurrentState("leaderboard");
      setLeaderboard(data.leaderboard);
    });
    _socket.on("problem", (data) => {
      console.log("problem-91");

      setCurrentState("question");
      setCurrentQuestion(data.problem);
    });
  }, []);

  if (currentState === "not_started") {
    return <QuizNoteStarted />;
  }
  if (currentState === "question" && currentQuestion && socket) {
    return (
      <Question
        roomId={code}
        userId={userIds}
        problemId={currentQuestion.id}
        quizData={{
          title: currentQuestion.description,
          options: currentQuestion.options,
        }}
        socket={socket}
      />
    );
  }
  if (currentState === "leaderboard" && leaderboard) {
    return (
      <LeaderBoard
        leaderboard={leaderboard.map(
          (x: {
            id: string;
            points: number;
            name: string;
            image?: string;
          }) => ({
            id: x.id,
            points: x.points,
            username: x.name,
            image: x.image,
          })
        )}
      />
    );
  }
  return <div className="">{userIds}quiz is ended</div>;
};
