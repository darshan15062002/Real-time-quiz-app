import { Socket } from "socket.io-client";

const QuizControl = ({
  socket,
  roomId,
}: {
  socket: Socket;
  roomId: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      Quiz controler
      <button
        className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue active:bg-gray-800"
        onClick={() => {
          console.log("handle next");

          socket.emit("next", { roomId });
        }}
      >
        Next
      </button>
    </div>
  );
};

export default QuizControl;
