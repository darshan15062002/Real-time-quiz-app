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
  return (
    <div className=" flex flex-col justify-center items-center bg-black h-screen text-white ">
      <div className="w-52 gap-y-2 flex flex-col">
        leaderboard
        {leaderboard.map((o, index) => (
          <div className="flex gap-x-3  w-full py-2 px-3 justify-between rounded-sm  bg-slate-800 text-white ">
            <h3>
              {index} {".  "} {o.username}
            </h3>
            {o.points}
          </div>
        ))}
      </div>
    </div>
  );
};
