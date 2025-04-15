import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBoard from "./pages/CreateBoard";
import BoardDetail from "./pages/BoardDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-board" element={<CreateBoard />} />
        <Route path="/boards/:id" element={<BoardDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
