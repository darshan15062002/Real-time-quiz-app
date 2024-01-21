export const QuizNoteStarted = ({
  users,
}: {
  users: { name: string; points: number; id: string }[];
}) => {
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const getRandomSize = () => {
    return Math.floor(Math.random() * (110 - 40 + 1)) + 80; // Adjust the range as needed
  };

  const getRandomPadding = () => {
    return Math.floor(Math.random() * (20 - 10 + 1)) + 10; // Adjust the range as needed
  };

  const getRandomAnimationDelay = () => {
    return Math.random() * 5; // Adjust the delay as needed
  };

  return (
    <div className="bg-black h-screen py-20 text-white flex flex-col items-center  ">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white">Waiting Room</h1>
        <p>quiz will be start soon...</p>
      </div>
      <div
        className="flex flex-wrap md:w-1/2 w-full mt-10 gap-3"
        style={{
          animationDelay: `${getRandomAnimationDelay()}s`,
          transition: "transform 3s ease-in-out",
        }}
      >
        {users?.map((user, index) => (
          <div
            key={index}
            style={{
              backgroundColor: getRandomColor(),
              padding: `${getRandomPadding()}px`,
              width: `${getRandomSize()}px`,
              height: `${getRandomSize()}px`,
              borderRadius: "50%",
              animation: "floatAnimation 5s infinite",
            }}
            className=" flex justify-center items-center overflow-hidden"
          >
            <h3 className="text-white font-bold text-xl">{user?.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
