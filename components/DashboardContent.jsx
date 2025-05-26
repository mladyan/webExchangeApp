import React, { useState } from "react";
import { useRouter } from "next/router";
import KonverzijaContent from "./KonverzijaContent";
import RacunContent from "./RacunContent";
import { Toaster, toast } from "react-hot-toast";

export default function DashboardContent({ user, setUser }) {
  const router = useRouter();
  const [selectedHeader, setSelectedHeader] = useState("Konverzija");

  return (
    <>
      <header>
        <div className="leftH">
          <img src="globe.svg" alt="logo" className="logo" />
          <div
            className="headerItem"
            onClick={() => setSelectedHeader("Konverzija")}
          >
            Konverzija
          </div>
          <div
            className="headerItem"
            onClick={() => setSelectedHeader("Račun")}
          >
            Račun
          </div>
        </div>
        <div className="rightH">
          <div className="headerItem">{user.email}</div>
          <div
            className="connectButton"
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            Odjavi se
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {selectedHeader === "Konverzija" && (
          <KonverzijaContent user={user} setUser={setUser} />
        )}
        {selectedHeader === "Račun" && <RacunContent user={user} />}
      </div>

      <Toaster position="bottom-center" />
    </>
  );
}
