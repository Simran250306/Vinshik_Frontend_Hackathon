import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Dashboard from "./dashboard"; // create a new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
          {/* Personalized welcome message section */}
          <div className="welcome">
            <h2>Welcome back, Julie 👋</h2>
            <p>Here's what you need to focus on today</p>
          </div>
