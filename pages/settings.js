import useSWR from "swr";

export default function HomePage({ userId }) {
  const { data: user } = useSWR(`/api/users/${userId}`);
  return (
    <div>
      👤 {user?.userName}
      <h1>Your settings 🥗</h1>
    </div>
  );
}
