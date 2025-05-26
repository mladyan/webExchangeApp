import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardContent from "../components/DashboardContent.jsx";
import "../app/globals.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/login");
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return <DashboardContent user={user} setUser={setUser} />;
}
