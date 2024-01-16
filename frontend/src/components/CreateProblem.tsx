import React, { useState } from "react";
import { Socket } from "socket.io-client";

function CreateProblem({ socket, roomId }: { socket: Socket; roomId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState(0);
  const [options, setOptions] = useState([
    {
      id: 0,
      title: "",
    },
    {
      id: 1,
      title: "",
    },
    {
      id: 2,
      title: "",
    },
    {
      id: 3,
      title: "",
    },
  ]);

  console.log(title, description, options, answer);

  return (
    <div className=" flex flex-col justify-center items-center w-full">
      <form className="">
        <label className="flex flex-col justify-center items-center mb-4">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-1 text-black border rounded-md"
          />
        </label>

        <label className="flex flex-col justify-center items-center mb-4">
          <span className="text-gray-700">Description:</span>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-1  border rounded-md"
          />
        </label>

        <label className=" flex flex-col  mb-4">
          <span className="text-gray-700 ">Options:</span>
          {[0, 1, 2, 3].map((optionId) => (
            <div>
              <input
                type="radio"
                checked={optionId === answer}
                onChange={() => {
                  setAnswer(optionId);
                }}
              />
              Option {optionId}
              <input
                type="text"
                onChange={(e) => {
                  setOptions((options) =>
                    options.map((x) => {
                      if (x.id === optionId) {
                        return {
                          ...x,
                          title: e.target.value,
                        };
                      }
                      return x;
                    })
                  );
                }}
              />
              <br />
            </div>
          ))}
        </label>

        <button
          onClick={() => {
            console.log("CreateProblem");

            socket.emit("createQuiz", {
              roomId,
              problem: {
                title,
                description,
                options,
                answer,
              },
            });
          }}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProblem;
