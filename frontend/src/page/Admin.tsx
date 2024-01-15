import React, { useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    options: [
      { id: 1, title: "" },
      { id: 2, title: "" },
      { id: 3, title: "" },
      { id: 4, title: "" },
    ],
    answer: "",
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "options") {
      const updatedOptions = [...formData.options];
      updatedOptions[index].title = value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log("Form Data:", formData);
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("addminJoin", {
        password: "admin",
      });
    });

    return () => {
      socket.off("connect", () => {});
      socket.off("disconnect", () => {});
      socket.off("foo", () => {});
    };
  }, []);
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full bg-black">
      <form className="max-w-xs  mt-8" onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Image:</span>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Options:</span>
          {formData.options.map((option, index) => (
            <input
              key={option.id}
              type="text"
              name="options"
              value={option.title}
              onChange={(e) => handleChange(e, index)}
              className="mt-1 p-2 w-full border rounded-md mb-2"
            />
          ))}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Answer:</span>
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Admin;
