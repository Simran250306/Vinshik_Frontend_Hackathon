import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addSampleData = async () => {
  const sampleStats = [
    {
      title: "Active Jobs",
      value: "43.7k",
      change: "+12.2%",
      positive: true,
      color: "#007bff"
    },
    {
      title: "Jobs In Progress",
      value: "92.3k",
      change: "-31.1%",
      positive: false,
      color: "#fd7e14"
    },
    {
      title: "Finished Jobs",
      value: "66.3k",
      change: "+3.3%",
      positive: true,
      color: "#28a745"
    },
    {
      title: "New Leads",
      value: "92.3k",
      change: "+31.1%",
      positive: true,
      color: "#6f42c1"
    }
  ];

  try {
    for (const stat of sampleStats) {
      await addDoc(collection(db, "stats"), stat);
    }
    console.log("Sample data added successfully!");
  } catch (error) {
    console.error("Error adding sample data:", error);
  }
};

// You can call this function from the browser console to add sample data
// addSampleData();
