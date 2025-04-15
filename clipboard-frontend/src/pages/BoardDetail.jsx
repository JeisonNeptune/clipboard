import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PinCard from "../components/PinCard";

const BoardDetail = () => {
  const { id } = useParams(); // board ID from URL
  const [board, setBoard] = useState(null);
  const [pins, setPins] = useState([]);
  const [form, setForm] = useState({
    type: "clip",
    contentUrl: "",
    title: "",
    note: "",
    tags: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/boards/${id}`)
      .then((res) => {
        setBoard(res.data);
        setPins(res.data.pins || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/pins", {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        boardId: id,
        addedBy: "67f808ef7df9eb4a268e1731",
      });
      window.location.reload(); // refresh to show new pin
    } catch (err) {
      console.error("Pin creation failed:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {board ? (
        <>
          <h1 className="text-3xl font-bold mb-2">{board.title}</h1>
          <p className="text-gray-700 mb-6">{board.description}</p>

          {/* New Pin Form */}
          <div className="bg-white p-4 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-2">Add New Pin</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                className="p-2 border rounded w-full"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="clip">Movie Clip</option>
                <option value="image">Image</option>
                <option value="song">Song</option>
              </select>

              <input
                className="p-2 border rounded w-full"
                placeholder="Content URL (YouTube, image, etc.)"
                value={form.contentUrl}
                onChange={(e) =>
                  setForm({ ...form, contentUrl: e.target.value })
                }
                required
              />

              <input
                className="p-2 border rounded w-full"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                className="p-2 border rounded w-full"
                placeholder="Note"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />

              <input
                className="p-2 border rounded w-full"
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Pin
              </button>
            </form>
          </div>
          {pins.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No pins yet — add something!
            </p>
          )}

          {/* Pins */}
          <div>
              <div className="flex flex-wrap gap-6 justify-between">
                {pins.map((pin) => (
                  <div
                    key={pin._id}
                    className="w-full sm:w-[48%] lg:w-[48%] bg-green-100"
                  >
                    <PinCard pin={pin} />
                  </div>
                ))}
              </div>
          </div>
        </>
      ) : (
        <p>Loading board...</p>
      )}
    </div>
  );
};

export default BoardDetail;
