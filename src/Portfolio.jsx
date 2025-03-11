import { useEffect } from "react";
import $ from "jquery";
import "./styles/style.scss";
import Calendar from './Calendar';
import contact from './assets/contact.png';
import laptop from './assets/laptop.png';
import bgRoom from './assets/bg-room.png';
import plant from './assets/plant.png';
import coffee from './assets/coffee.png';
import gummies from './assets/gummies.png';
import folder from './assets/folder.png';
import pens from './assets/pens.png';
import clock from './assets/clock-clean.png';
import jewelery from './assets/jewelery-bowl.png';
import notebook from './assets/notebook.png';
import airpods from './assets/airpods.png';
import sunnies from './assets/sunnies.png';
import screensaver from './assets/screensaver.jpg';
import bulletin from './assets/bulletin.png';
import jellyfish from './assets/jellyfish.png';
import samPoster from './assets/sam-poster.png';
import dogs from './assets/dogs.png';
import desk from './assets/desk.png';
import window from './assets/window.png';
import paper from './assets/paper.png';


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
      <img className="plant" src={plant} alt="Plant" />
      <img className="coffee" src={coffee} alt="Coffee" />
      <img className="gummies" src={gummies} alt="Gummies" />

      <div className="contact clickable" style={{ backgroundImage: `url(${contact})` }} >
        <ul>
          <li>(678) 314-8280</li>
          <li>samgwolfe12@gmail.com</li>
        </ul>
      </div>

      <div className="laptop clickable" style={{ backgroundImage: `url(${laptop})` }} id="laptop">
        <div class="screen" style={{ backgroundImage: `url(${screensaver})` }}>
          <div className="explorer">
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
                  <img className="folder" src={folder} alt="Folder" />
                  <h2>Portfolio Repo</h2>
                </a>
                <a className="project" target="_blank" rel="noopener noreferrer" href="https://wcchurch.org/">
                  <img className="folder" src={folder} alt="Folder" />
                  <h2>WCC Website</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="bulletin" src={bulletin} alt="bulletin"/>
      <img className="jellyfish" src={jellyfish} alt="jellyfish"/>
      <img className="sam-poster" src={samPoster} alt="Sam Wolfe"/>
      <img className="desk" src={desk} alt="desk"/>
      <img className="window" src={window} alt="window"/>
      <img className="paper" src={paper} aly="paper"/>
      <img className="dogs" src={dogs} alt="dogs"/>
      <img className="pens" src={pens} alt="Pens" />
      <img className="clock" src={clock} alt="Clock" />
      <img className="jewelery" src={jewelery} alt="Jewelery" />
      <img className="notebook" src={notebook} alt="Notebook" />
      <img className="airpods" src={airpods} alt="Airpods" />
      <img className="sunnies" src={sunnies} alt="Sunnies" />
      <Calendar></Calendar>
      <div class="bottom-border">
        <span>SAM WOLFE</span>
      </div>
    </div>
  );
};

export default Portfolio;
