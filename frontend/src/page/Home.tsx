import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Question } from "../components/Question";
import { LeaderBoard } from "../components/LeaderBoard";
import { QuizNoteStarted } from "../components/QuizNotStarted";

function Home() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!submitted) {
    return (
      <div className="h-screen flex gap-y-5 flex-col justify-center items-center w-full bg-black">
        <h1 className="font-bold text-4xl text-white">Join Room</h1>
        <div
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
          <p className="  text-red-600">{error}</p>
          <button
            className="bg-white p-2"
            onClick={() => {
              setSubmitted(true);
            }}
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserLoggedIn
      setError={setError}
      setSubmitted={setSubmitted}
      code={code}
      name={name}
    />
  );
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
  setSubmitted,
  setError,
  code,
  name,
}: {
  setError: (value: string) => void;
  setSubmitted: (value: boolean) => void;
  code: string;
  name: string;
}) => {
  const [currentState, setCurrentState] = useState("not_started");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [socket, setSocket] = useState<null | Socket>(null);
  const [userIds, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const _socket = io("http://localhost:3000");
    setSocket(_socket);

    _socket.on("connect", () => {
      _socket.emit("join", {
        roomId: code,
        name,
      });
    });

    _socket.on("invaildRoom", () => {
      setError("Please enter vaild roomID");
      setSubmitted(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    });

    _socket.on("usersJoined", ({ users }) => {
      console.log("usersjoined.", users);
      setUsers(users);
    });

    _socket.on("init", ({ userId, state }) => {
      setUserId(userId);

      if (state?.type === "not_started") {
        setUsers(state?.users);
      }

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

    return () => {
      _socket.disconnect();
    };
  }, []);

  if (currentState === "not_started") {
    return <QuizNoteStarted users={users} />;
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
  return (
    <div className="bg-black h-screen flex justify-center text-white items-center">
      quiz is ended
    </div>
  );
};
