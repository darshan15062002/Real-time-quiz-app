export const LeaderBoard = ({
  leaderboard,
}: {
  leaderboard: {
    id: string;
    username: string;
    points: number;
    image?: string;
  }[];
}) => {
  // leaderboard = [
  //   { id: "@DMU))C", username: "fsd", points: 0 },
  //   { id: "SGOQFQR", username: "fsd", points: 0 },
  // ];
  // leaderboard = leaderboard.slice(0, leaderboard.length / 2);

  const getMaxPoints = () => {
    const maxPoints = Math.max(...leaderboard.map((o) => o.points), 1);
    return maxPoints;
  };

  return (
    <div className=" flex flex-col pt-20 gap-y-7 items-center bg-black h-screen text-white ">
      <h1 className="font-bold text-4xl">LeaderBoard</h1>

      <div className="w-80 gap-y-2 flex flex-col">
        {leaderboard.map((o, index) => (
          <div key={o.id} className="w-full">
            <h3 className="flex items-center justify-between py-2 px-3 rounded-sm bg-slate-800 text-white">
              <span>
                {index + 1}. {o.username}
              </span>
              <span>{Math.ceil(o.points)}</span>
            </h3>
            <div
              className="bg-gradient-to-r from-green-400 to-red-500 h-2 rounded-sm"
              style={{ width: `${(o.points / getMaxPoints()) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
