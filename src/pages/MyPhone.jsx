// src/pages/MyPhone.jsx
import { useState } from "react";
import Phone from "../components/Phone";

const MyPhone = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (pageId) => {
    switch (pageId) {
      case "home":
        setCurrentPage("home");
        break;
      case "projects":
        setCurrentPage("projects");
        break;
      case "skills":
        setCurrentPage("skills");
        break;
      case "links":
        setCurrentPage("links");
        break;
      case "resume":
        setCurrentPage("resume");
        break;
      case "about":
        setCurrentPage("about");
        break;
      default:
        setCurrentPage("home");
    }
  };

  return (
    <div className="myPhone">
      <Phone currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
};

export default MyPhone;
