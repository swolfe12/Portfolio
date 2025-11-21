import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.js";

export default function ArcadeLayout(onNavigate) {
  return (
    <div className="skills-hub">
      <NavBar onNavigate={onNavigate} />
      <div className="game-box">
        <Outlet />
      </div>
    </div>
  );
}
