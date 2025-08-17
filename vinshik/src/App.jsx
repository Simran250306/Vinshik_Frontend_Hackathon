import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";
import { db, auth } from "./firebase";

export default function App() {
  const [stats, setStats] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "stats"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStats(data);
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Vin<span style={{ color: "black" }}>Shik</span></h1>
      </div>

      <div className="main">
        <h2>Dashboard (Live from Firestore 🚀)</h2>
        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.id} className="card">
              <h3>{stat.title}</h3>
              <p className="value">{stat.value}</p>
              <p className={`change ${stat.positive ? "positive" : "negative"}`}>
                {stat.change}
              </p>
              <div className="bar" style={{ background: stat.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export {db, auth};