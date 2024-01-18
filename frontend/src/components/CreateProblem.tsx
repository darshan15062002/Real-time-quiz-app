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

  return (
    <div className=" flex flex-col justify-center items-center w-full">
      <form className="w-72">
        <label className=" hidden  flex-col justify-center items-center mb-4">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full p-1 text-black border rounded-md"
          />
        </label>

        <label className="flex flex-col justify-center items-center mb-4">
          <span className="text-gray-700">Question:</span>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full p-1  border rounded-md"
          />
        </label>

        <label className=" flex flex-col  mb-4">
          <span className="text-gray-700 ">Options:</span>
          {[0, 1, 2, 3].map((optionId) => (
            <div className=" flex">
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
                value={options[optionId].title}
                className="px-3 py-2 w-full mb-2 "
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
          onClick={(e) => {
            e.preventDefault();
            setTitle("");
            setDescription("");
            setOptions([
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
            socket.emit("createProblem", {
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
          Add Problem
        </button>
      </form>
    </div>
  );
}

export default CreateProblem;
