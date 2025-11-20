import Navbar from "../../components/NavBar.tsx";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import { RiExternalLinkLine } from "react-icons/ri";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";

type LinksProps = {
  onNavigate?: (pageId: string) => void;
};

export const Links = ({ onNavigate }: LinksProps) => {
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
            <img src={github} height="200px" alt="Github Icon"></img>
            <br />
            <span>
              Github <RiExternalLinkLine />
            </span>
          </a>
          <a href="https://www.linkedin.com/in/sam-wolfe-59465b186/">
            <img src={linkedin} height="200px" alt="LinkedIn Icon"></img>
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
