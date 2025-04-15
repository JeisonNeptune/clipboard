import { Link } from "react-router-dom";

const BoardCard = ({ board }) => {
  return (
    <Link to={`/boards/${board._id}`}>
      <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-bold text-gray-800">{board.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{board.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {board.tags?.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
