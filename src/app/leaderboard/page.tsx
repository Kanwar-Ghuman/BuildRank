import { LeaderboardClient } from "./leaderboard-client";

export const metadata = {
  title: "Leaderboard — BuildRank",
  description: "The top-rated projects on BuildRank.",
};

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}
