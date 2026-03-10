import { FeedClient } from "./feed-client";

export const metadata = {
  title: "Feed — BuildRank",
  description: "Discover and rate projects from the community.",
};

export default function FeedPage() {
  return <FeedClient />;
}
