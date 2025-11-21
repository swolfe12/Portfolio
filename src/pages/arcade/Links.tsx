import Navbar from "../../components/NavBar";
import { RiExternalLinkLine } from "react-icons/ri";
import Breadcrumbs from "../../components/Breadcrumbs";

type LinksProps = {
  onNavigate?: (pageId: string) => void;
};

export const Links: React.FC<LinksProps> = ({ onNavigate }) => {
  return (
    <div className="links">
      <Navbar onNavigate={onNavigate} />
      <Breadcrumbs
        onNavigate={onNavigate}
        items={[
          { id: "home", label: "Home" },
          { id: "links", label: "Links", isCurrent: true },
        ]}
      />
      <div className="game-box">
        <div className="section-header">Links</div>
        <div className="list">
          <a href="https://github.com/swolfe12?tab=repositories">
            <img src="/assets/github.png" height="200px" alt="Github Icon" />
            <br />
            <span>
              Github <RiExternalLinkLine />
            </span>
          </a>
          <a href="https://www.linkedin.com/in/sam-wolfe-59465b186/">
            <img
              src="/assets/linkedin.png"
              height="200px"
              alt="LinkedIn Icon"
            />
            <br />
            <span>
              LinkedIn <RiExternalLinkLine />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Links;
