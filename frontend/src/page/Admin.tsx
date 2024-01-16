import { useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";
import CreateProblem from "../components/CreateProblem";
import QuizControl from "../components/QuizControl";

function Admin() {
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState<Socket>();
  const [quizId, setQuizId] = useState("");

  useEffect(() => {
    const _socket = io("http://localhost:3000");
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
        <input
          className=" p-3"
          type="text"
          placeholder="RoomID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-white rounded-sm font-bold "
          onClick={() => {
            socket?.emit("createQuiz", { roomId });
            setQuizId(roomId);
          }}
        >
          create Room
        </button>
      </div>
    );
  return (
    <>
      {socket && (
        <div className="flex flex-col bg-black justify-center items-center">
          <CreateProblem socket={socket} roomId={quizId} />
          <QuizControl socket={socket} roomId={quizId} />
        </div>
      )}
    </>
  );
}

export default Admin;
