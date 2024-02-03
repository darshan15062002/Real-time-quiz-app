import { useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";
import CreateProblem from "../components/CreateProblem";
import QuizControl from "../components/QuizControl";
import { Link } from "react-router-dom";

function Admin() {
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState<Socket>();
  const [quizId, setQuizId] = useState("");

  useEffect(() => {
    const _socket = io("https://real-time-quiz-app.onrender.com");
    // const _socket = io("http://localhost:3000");
    setSocket(_socket);
    _socket.on("connect", () => {
      console.log("connected");

      _socket.emit("addminJoin", {
        password: "admin",
      });
    });

    return () => {
      _socket?.off("connect", () => {});
      _socket.off("disconnect", () => {});
      _socket.off("foo", () => {});
    };
  }, []);

  if (!quizId)
    return (
      <div className="h-screen bg-black flex flex-col justify-center items-center gap-y-5">
        <Link
          to="/"
          className="absolute top-6 right-10 border border-white text-white rounded-md p-2"
        >
          Join Room
        </Link>
        <div
          style={{
            boxShadow: "rgb(59 130 246 / 0.5) 0px 0px 0px 20px",
          }}
          className=" mx-5 flex
          rounded-xl
      flex-col bg-white  p-10  gap-y-5"
        >
          <input
            className="p-2 px-6 w-full outline-slate-400  bg-slate-200 rounded-md"
            type="text"
            placeholder="RoomID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            className="bg-white rounded-md px-4 py-2 border font-bold border-black "
            onClick={() => {
              socket?.emit("createQuiz", { roomId });
              setQuizId(roomId);
            }}
          >
            create Room
          </button>
        </div>
      </div>
    );
  return (
    <>
      {socket && (
        <div className="flex h-screen flex-col bg-black justify-center items-center">
          <CreateProblem socket={socket} roomId={quizId} />
          <QuizControl socket={socket} roomId={quizId} />
        </div>
      )}
    </>
  );
}

export default Admin;
