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
