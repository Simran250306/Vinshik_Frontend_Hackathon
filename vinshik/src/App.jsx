import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Calendar from "./Calendar";
import Map from "./Map";
import Clients from "./Clients";
import Jobs from "./Jobs";
import Quotes from "./Quotes";
import MyServices from "./MyServices";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/map" element={<Map />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/services" element={<MyServices />} />
      </Routes>
    </Router>
  );
}

export default App;
