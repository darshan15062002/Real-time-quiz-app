function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full bg-black">
      <form
        className="flex
      flex-col gap-y-5"
      >
        <input
          className="p-2 px-4"
          type="text"
          placeholder="name"
          name=""
          id=""
        />
        <input
          className="p-2 px-4"
          type="text"
          name=""
          id=""
          placeholder="room Id"
        />
        <button>Join</button>
      </form>
    </div>
  );
}

export default Home;
