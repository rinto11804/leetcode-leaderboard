import { IUser } from "@/models/user.model";
import React from "react";

const getRankEmoji = (rank: number) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return rank.toString();
  }
};

// Define the props type for the Leaderboard component
interface LeaderboardProps {
  data: IUser[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => (
  <div className="card overflow-x-auto bg-base-300 w-full p-5">
    <div className="card-body">
      <table className="table table-auto w-full">
        {/* Table Head */}
        <thead>
          <tr className="text-lg">
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-700 ">
              <td className="text-2xl">{getRankEmoji(idx + 1)}</td>
              <td>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{item.username}</span>
                </div>
              </td>
              <td className="text-lg">{item.points} pts</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <div className="card-end w-full">
      <div className="join">
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">99</button>
        <button className="join-item btn">100</button>
      </div>
    </div> */}
  </div>
);

export default Leaderboard;
