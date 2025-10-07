
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar.tsx";

export default function ArcadeLayout({ isArcade = true, onNavigate }) {
  return (
    <div className="skills-hub">
      <NavBar isArcade={isArcade} onNavigate={onNavigate} />
      <div className="game-box">
        <Outlet />
      </div>
    </div>
  );
}
