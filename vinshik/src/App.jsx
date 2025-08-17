// Import necessary React hooks for state management and side effects
import { useEffect, useState } from "react";
// Import Firestore functions for database operations
import { collection, getDocs } from "firebase/firestore";
// Import CSS styles for the application
import "./App.css";
// Import Firebase services initialized in firebase.js
import { db, auth } from "./firebase";

export default function App() {
  // State to store statistics data fetched from Firestore
  const [stats, setStats] = useState([]);

  // Fetch data from Firestore when component mounts
  // This effect runs once when the component is first rendered
  useEffect(() => {
    const fetchData = async () => {
      // Query the 'stats' collection from Firestore
      const querySnapshot = await getDocs(collection(db, "stats"));
      // Transform the query results into a more usable format
      // Extract document ID and all fields from each document
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Update state with the fetched data
      setStats(data);
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Sample data for the dashboard cards
  // In a production environment, this would come from Firestore
  // Each card has a unique ID, title, value, change percentage, positive/negative indicator, and color schemes
  const dashboardData = [
    // Active Jobs card with blue color scheme and positive change
    { id: 1, title: "Active Jobs", value: "43.7k", change: "+5.2%", positive: true, color: "#4F46E5", chartColor: "#818CF8" },
    // Jobs In Progress card with amber color scheme and negative change
    { id: 2, title: "Jobs In Progress", value: "92.3k", change: "-3.1%", positive: false, color: "#F59E0B", chartColor: "#FCD34D" },
    // Finished Jobs card with green color scheme and positive change
    { id: 3, title: "Finished Jobs", value: "66.3k", change: "+3.4%", positive: true, color: "#10B981", chartColor: "#6EE7B7" },
    // New Leads card with purple color scheme and positive change
    { id: 4, title: "New Leads", value: "92.3k", change: "+5.1%", positive: true, color: "#8B5CF6", chartColor: "#C4B5FD" },
  ];

  return (
    // Main application container with flex layout
    <div className="app">
      {/* Sidebar navigation component */}
      <div className="sidebar">
        {/* Application logo with two-tone styling */}
        <h1>Vin<span style={{ color: "black" }}>Shik</span></h1>
        {/* Navigation menu with icon buttons */}
        <nav>
          {/* Active navigation item - Home */}
          <button className="active">
            {/* Home icon using SVG for crisp rendering at any size */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Calendar
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
            </svg>
            Map
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Clients
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            </svg>
            Jobs
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Quotes
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
              <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
              <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
              <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
              <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
              <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
            </svg>
            My Services
          </button>
        </nav>
      </div>

      {/* Main content area */}
      <div className="main">
        {/* Header section with profile controls and welcome message */}
        <div className="header">
          {/* Profile section with notification, settings buttons and avatar */}
          <div className="profile">
            {/* Notification bell button */}
            <button className="icon-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            {/* Settings gear button */}
            <button className="icon-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            {/* User avatar/profile picture */}
            <div className="avatar">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" />
            </div>
          </div>
          {/* Personalized welcome message section */}
          <div className="welcome">
            <h2>Welcome back, Julie 👋</h2>
            <p>Here's what you need to focus on today</p>
          </div>
        </div>

        {/* Dashboard section containing statistics cards */}
        <div className="dashboard">
          {/* Grid layout for statistics cards */}
          <div className="stats">
            {/* Map through dashboard data to create cards dynamically */}
            {dashboardData.map((stat) => (
              <div key={stat.id} className="card">
                {/* Card header with title and percentage change */}
                <div className="card-header">
                  <h3>{stat.title}</h3>
                  {/* Dynamic styling based on positive/negative change */}
                  <p className={`change ${stat.positive ? "positive" : "negative"}`}>
                    {stat.change}
                  </p>
                </div>
                {/* Main statistic value display */}
                <p className="value">{stat.value}</p>
                {/* Chart visualization for the statistic */}
                <div className="chart">
                  {/* SVG-based bar chart visualization */}
                  <svg width="100%" height="30" viewBox="0 0 100 30">
                    {/* Each rectangle represents a data point in the chart */}
                    {/* Varying heights and opacities create a visual pattern */}
                    <rect x="0" y="5" width="10" height="20" rx="2" fill={stat.chartColor} opacity="0.3" />
                    <rect x="15" y="10" width="10" height="15" rx="2" fill={stat.chartColor} opacity="0.4" />
                    <rect x="30" y="7" width="10" height="18" rx="2" fill={stat.chartColor} opacity="0.5" />
                    <rect x="45" y="5" width="10" height="20" rx="2" fill={stat.chartColor} opacity="0.6" />
                    <rect x="60" y="3" width="10" height="22" rx="2" fill={stat.chartColor} opacity="0.8" />
                    <rect x="75" y="8" width="10" height="17" rx="2" fill={stat.chartColor} opacity="0.9" />
                    <rect x="90" y="4" width="10" height="21" rx="2" fill={stat.chartColor} />
                  </svg>
                </div>
                {/* Colored bar at bottom of card for visual distinction */}
                <div className="bar" style={{ background: stat.color }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export {db, auth};