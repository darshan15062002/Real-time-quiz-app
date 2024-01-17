import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Question } from "../components/Question";
import { LeaderBoard } from "../components/LeaderBoard";

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

export const UserLoggedIn = ({ code, name }) => {
  const [currentState, setCurrentState] = useState("not_started");
  const [currentQuestion, setCurrentQuestion] = useState();
  const [leaderboard, setLeaderboard] = useState([]);
  const [socket, setSocket] = useState<null | Socket>(null);
  const [userId, setUserId] = useState();
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
    return <div className="">Quiz not started yet</div>;
  }
  if (currentState === "question") {
    return <Question question={question} />;
  }
  if (currentState === "leaderboard") {
    return (
      <LeaderBoard
        leaderboard={leaderboard.map((x: any) => ({
          points: x.points,
          username: x.name,
          image: x.image,
        }))}
      />
    );
  }
  return <div className="">quiz is ended</div>;
};
