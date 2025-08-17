import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addSampleData } from "./sampleData";
import "./App.css";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        // User is not authenticated, redirect to login
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
    
    if (user) {
      fetchData();
    }
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
    // Refresh the data
    const querySnapshot = await getDocs(collection(db, "stats"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setStats(data);
  };

  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Calendar", icon: "📅" },
    { name: "Map", icon: "🗺️" },
    { name: "Clients", icon: "👥" },
    { name: "Jobs", icon: "💼" },
    { name: "Quotes", icon: "✅" },
    { name: "My Services", icon: "📋" }
  ];

  if (loading) {
    return (
      <div className="dashboard">
        <aside className="sidebar">
          <h1 className="logo">Vin<span>Shik</span></h1>
        </aside>
        <main className="main">
          <h2>Loading...</h2>
        </main>
      </div>
    );
  }

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
              onClick={() => setActiveMenu(item.name)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="main">
        {/* Top navbar */}
        <div className="topbar">
          <div>
            <h2>Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'} 👋</h2>
            <p>Here's what you need to focus on today</p>
          </div>
          <div className="topbar-icons">
            <button>📧</button>
            <button>⚙️</button>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="profile" 
              className="avatar" 
            />
          </div>
        </div>

        {/* Add Sample Data Button (temporary) */}
        {stats.length === 0 && (
          <div style={{ marginBottom: "20px" }}>
            <button 
              onClick={handleAddSampleData}
              style={{
                padding: "10px 20px",
                background: "#20c997",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              Add Sample Data
            </button>
          </div>
        )}

        {/* Stats cards */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <span className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
                  {stat.positive ? "↗" : "↘"} {stat.change}
                </span>
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <div className="stat-bar" style={{ color: stat.color }}>
                ▇▇▇
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
