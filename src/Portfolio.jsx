import { useEffect } from "react";
import $ from "jquery";
import "./styles/style.scss";
import contact from './assets/contact.png';
import laptop from './assets/laptop.png';
import bgRoom from './assets/bg-room.png';


const Portfolio = () => {
  useEffect(() => {
    // Laptop Click Handling
    $("#laptop").on("click", function (e) {
      var $clickedElement = $(e.target);
      if (!$clickedElement.is("a")) {
        $(".contact").removeClass("scale-up active");
        $(this).toggleClass("scale-up active");
      }
    });

    // Contact Click Handling
    $(".contact").on("click", function (e) {
      e.preventDefault();
      $(".laptop").removeClass("scale-up active");
      $(this).toggleClass("scale-up active");
    });

    return () => {
      // Cleanup event listeners when component unmounts
      $("#laptop").off("click");
      $(".contact").off("click");
    };
  }, []);

  return (
    <div className="container">
      <div className="bg-img" style={{backgroundImage: `url(${bgRoom})` }}></div>
      <img className="plant" src="assets/plant.png" alt="Plant" />
      <img className="coffee" src="assets/coffee.gif" alt="Coffee" />
      <img className="gummies" src="assets/gummies.png" alt="Gummies" />

      <div className="contact clickable" style={{ backgroundImage: `url(${contact})` }} >
        <ul>
          <li>(678) 314-8280</li>
          <li>samgwolfe12@gmail.com</li>
        </ul>
      </div>

      <div className="laptop clickable" style={{ backgroundImage: `url(${laptop})` }} id="laptop">
        <div className="window">
          <div className="location">
            <div className="path"></div>
          </div>
          <div className="content">
            <div className="left">
              <ul>
                <li>Documents</li>
                <li>Downloads</li>
                <li>Pictures</li>
              </ul>
            </div>
            <div className="right">
              <a className="project" target="_blank" rel="noopener noreferrer" href="https://github.com/swolfe12/Portfolio">
                <img className="folder" src="assets/folder.png" alt="Folder" />
                <h2>Portfolio Repo</h2>
              </a>
              <a className="project" target="_blank" rel="noopener noreferrer" href="https://wcchurch.org/">
                <img className="folder" src="assets/folder.png" alt="Folder" />
                <h2>WCC Website</h2>
              </a>
            </div>
          </div>
        </div>
      </div>

      <img className="pens" src="assets/pens.png" alt="Pens" />
      <img className="clock" src="assets/clock.gif" alt="Clock" />
      <img className="jewelery" src="assets/jewelery.png" alt="Jewelery" />
      <img className="notebook" src="assets/notebook.png" alt="Notebook" />
      <img className="airpods" src="assets/airpods.png" alt="Airpods" />
      <img className="sunnies" src="assets/sunnies.png" alt="Sunnies" />
    </div>
  );
};

export default Portfolio;
