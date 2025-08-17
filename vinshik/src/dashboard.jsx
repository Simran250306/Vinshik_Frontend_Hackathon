import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addSampleData } from "./sampleData";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setLoading(false);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stats"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    if (user) fetchData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddSampleData = async () => {
    await addSampleData();
    const querySnapshot = await getDocs(collection(db, "stats"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setStats(data);
  };

  const menuItems = [
    { 
      name: "Home", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ), 
      path: "/dashboard" 
    },
    { 
      name: "Calendar", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ), 
      path: "/calendar" 
    },
    { 
      name: "Map", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
      ), 
      path: "/map" 
    },
    { 
      name: "Clients", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ), 
      path: "/clients" 
    },
    { 
      name: "Jobs", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
        </svg>
      ), 
      path: "/jobs" 
    },
    { 
      name: "Quotes", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ), 
      path: "/quotes" 
    },
    { 
      name: "My Services", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
          <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
        </svg>
      ), 
      path: "/services" 
    }
  ];

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">
          Vin<span>Shik</span>
        </h1>
        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeMenu === item.name ? "active" : ""}
              onClick={() => {
                setActiveMenu(item.name);
                navigate(item.path);
              }}
            >
              <span className="menu-icon">{item.icon}</span> {item.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="main">
        {/* Topbar */}
        <div className="topbar">
          <div>
            <h2>Welcome back, {user?.displayName || user?.email?.split("@")[0] || "User"} 👋</h2>
            <p>Here's what you need to focus on today</p>
          </div>
          <div className="topbar-icons">
            <button className="icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            <img
              src={user?.photoURL || "https://randomuser.me/api/portraits/women/44.jpg"}
              alt="profile"
              className="avatar"
              onClick={() => navigate("/profile")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Add Sample Data Button */}
        {stats.length === 0 && (
          <div className="sample-data">
            <button onClick={handleAddSampleData}>Add Sample Data</button>
          </div>
        )}

        {/* Stats grid */}
        <div className="stats-grid">
        {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
            <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <span className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
                {stat.positive ? "+" : ""}{stat.change}
                </span>
            </div>
            <h3 className="stat-value">{stat.value}</h3>

            <div className="stat-chart">
                <svg width="100%" height="30" viewBox="0 0 100 30">
                    <rect x="0" y="5" width="10" height="20" rx="2" fill={stat.color} opacity="0.3" />
                    <rect x="15" y="10" width="10" height="15" rx="2" fill={stat.color} opacity="0.4" />
                    <rect x="30" y="7" width="10" height="18" rx="2" fill={stat.color} opacity="0.5" />
                    <rect x="45" y="5" width="10" height="20" rx="2" fill={stat.color} opacity="0.6" />
                    <rect x="60" y="3" width="10" height="22" rx="2" fill={stat.color} opacity="0.8" />
                    <rect x="75" y="8" width="10" height="17" rx="2" fill={stat.color} opacity="0.9" />
                    <rect x="90" y="4" width="10" height="21" rx="2" fill={stat.color} />
                </svg>
            </div>
            <div className="stat-bar" style={{ background: stat.color }}></div>
            </div>
        ))}
        </div>

      </main>
    </div>
  );
}
