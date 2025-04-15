import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBoard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBoard = {
        title,
        description,
        tags: tags.split(",").map(tag => tag.trim()),
        createdBy: "67f808ef7df9eb4a268e1731" // 🔐 temp until login is added
      };

      await axios.post("http://localhost:5000/api/boards", newBoard);
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error("Board creation failed:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Board</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Tags (comma-separated)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Board
        </button>
      </form>
    </div>
  );
};

export default CreateBoard;
