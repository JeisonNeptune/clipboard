import { useEffect, useState } from "react";
import axios from "axios";
import BoardCard from "../components/BoardCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/boards")
      .then((res) => setBoards(res.data))
      .catch((err) => console.error("Failed to fetch boards", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/create-board"
        className="inline-block mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + New Board
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Boards</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <BoardCard key={board._id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default Home;
