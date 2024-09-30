import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/scoreboard" element={<Scoreboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
