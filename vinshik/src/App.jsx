import { useState } from "react";
import "./App.css";

const menuItems = ["Home", "Calendar", "Map", "Clients", "Jobs", "Quotes", "My Services"];

const stats = [
  { title: "Active Jobs", value: "43.7k", change: "+12.2%", positive: true, color: "#60a5fa" },
  { title: "Jobs In Progress", value: "92.3k", change: "-31.1%", positive: false, color: "#f97316" },
  { title: "Finished Jobs", value: "66.3k", change: "+3.3%", positive: true, color: "#22c55e" },
  { title: "New Leads", value: "92.3k", change: "+31.1%", positive: true, color: "#a855f7" },
];

export default function App() {
  const [active, setActive] = useState("Home");

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>Vin<span style={{ color: "black" }}>Shik</span></h1>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={active === item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="main">
        {/* Navbar */}
        <div className="navbar">
          <h2>Welcome back, Julie 👋</h2>
          <div className="profile">
            <span>⚙️</span>
            <span>📩</span>
            <img src="https://i.pravatar.cc/40" alt="Profile" />
          </div>
        </div>
        <p>Here’s what you need to focus on today</p>

        {/* Stats */}
        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.title} className="card">
              <h3>{stat.title}</h3>
              <p className="value">{stat.value}</p>
              <p className={`change ${stat.positive ? "positive" : "negative"}`}>{stat.change}</p>
              <div className="bar" style={{ background: stat.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
