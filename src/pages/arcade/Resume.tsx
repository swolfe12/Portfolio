import Navbar from "../../components/NavBar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import { RiExternalLinkLine } from "react-icons/ri";

type ResumeProps = {
  onNavigate?: (pageId: string) => void;
};
const documentURL =
  "https://docs.google.com/document/d/1ei5dTmXsQ0X0AeQnxmuT2cDt-WKHS_6uZe_WAqVl7yU/edit?usp=sharing";
export const Resume = ({ onNavigate }: ResumeProps) => {
  return (
    <div className="resume">
      <Navbar onNavigate={onNavigate} />
      <Breadcrumbs
        onNavigate={onNavigate}
        items={[
          { id: "home", label: "Home" },
          { id: "resume", label: "Resume", isCurrent: true },
        ]}
      />
      <div className="game-box">
        <div className="section-header">Resume</div>
        <div className="resume-iframe">
          <p>
            I keep my Resume up to date on Google Docs. Check it out embedded
            below, or click the link to view it full-size.
          </p>
          <button className="resume-btn basic-btn">
            <a href={documentURL} target="_blank" rel="noopener noreferrer">
              Go To Resume <RiExternalLinkLine />
            </a>
          </button>
          <iframe
            title="Resume"
            src={documentURL}
            width="100%"
            height="600px"
          />
        </div>
      </div>
    </div>
  );
};

export default Resume;
