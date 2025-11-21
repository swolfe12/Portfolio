import Navbar from "../../components/NavBar";

type TempPageProps = {
  isArcade?: boolean;
  onNavigate?: (pageId: string) => void;
};

export const TempPage: React.FC<TempPageProps> = ({
  isArcade = true,
  onNavigate,
}) => {
  return (
    <div className="temp">
      <Navbar onNavigate={onNavigate} />
      <div className="popup-overlay">
        <div className="popup-box">
          <img
            src="/assets/work-sign.png"
            alt="Work in Progress"
            className="sign-img"
          />
        </div>
      </div>
    </div>
  );
};

export default TempPage;
