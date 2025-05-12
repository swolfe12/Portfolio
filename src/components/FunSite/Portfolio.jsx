import { useEffect, useState } from "react";
import $ from "jquery";
import "./../../styles/main.scss";
import Calendar from './Calendar';
import Clock from './Clock';
import contact from './../../assets/contact.png';
import laptop from './../../assets/laptop.png';
import bgRoom from './../../assets/bg-room.png';
import plant from './../../assets/plant.png';
import coffee from './../../assets/coffee.png';
import gummies from './../../assets/gummies.png';
import folder from './../../assets/folder.png';
import pens from './../../assets/pens.png';
import jewelery from './../../assets/jewelery-bowl.png';
import notebook from './../../assets/notebook.png';
import airpods from './../../assets/airpods.png';
import headphones from './../../assets/headphones.png';
import lavalamp from './../../assets/lavalamp.png';
import sunnies from './../../assets/sunnies.png';
import screensaver from './../../assets/screensaver.jpg';
import bulletin from './../../assets/bulletin.png';
import jellyfish from './../../assets/jellyfish.png';
import samPoster from './../../assets/sam-poster.png';
import dogs from './../../assets/dogs.png';
import desk from './../../assets/desk.png';
import window from './../../assets/window.png';
import paper from './../../assets/paper.png';
import samBubble from './../../assets/sam-bubble.png';
import starbies from './../../assets/starbies.png';
import mouse from './../../assets/mouse.png';
import browser from './../../assets/browser.PNG';
import clouds from './../../assets/window.mp4';
import speaker from './../../assets/speaker.png';


const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

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
    <div className="portfolio">
      <div className="inner-container">

      <div className="bg-img" style={{backgroundImage: `url(${bgRoom})` }}></div>

      {isModalOpen && (
      <div className = "popup">
       <div className="popup-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <img className="sam-bubble" src={samBubble} alt="Sam Bubble" />
            <p>Hey! Nice to meet you, I'm Sam. Welcome to my room! Feel free to look around!
              <br></br><br></br>
            P.S. I have some cool projects on my laptop. You should check them out!</p>
        </div>
      </div>
      )}
      <img className="plant" src={plant} alt="Plant" />
      <img className="coffee" src={coffee} alt="Coffee" />
      <img className="speaker" src={speaker} alt="Speaker" />
      <img className="gummies" src={gummies} alt="Gummies" />

      <div className="contact clickable" style={{ backgroundImage: `url(${contact})` }} >
        <ul>
          <li>(678) 314-8280</li>
          <li>samgwolfe12@gmail.com</li>
        </ul>
      </div>

      <div className="laptop clickable" style={{ backgroundImage: `url(${laptop})` }} id="laptop">
        <div class="screen" style={{ backgroundImage: `url(${screensaver})` }}>
          <div className="browser">
            <div className="topBar">
              <button className="close"></button>
              <button className="minimize"></button>
              <button className="expand"></button>
            </div>
            <div className="terminal">
              <span>Last login: Fri Mar 7 23:58:32 on ttys003</span><br></br>
              <span>samgwolfe@MacBookAir ~ % hack the mainframe</span><br></br>
              <span>zsh: command not found: hack</span><br></br>
              <span>samgwolfe@MacBookAir ~ %</span>
            </div>
            
            <img src={browser} alt="broswer"/>

          </div>
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

      <video
      autoPlay
      loop
      muted
      playsInline
      className="clouds"
      id="myVideo"
    >
      <source src={clouds} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

  
      <img className="window" src={window} alt="window"/>
      <img className="paper" src={paper} alt="paper"/>
      <img className="dogs" src={dogs} alt="dogs"/>
      <img className="pens" src={pens} alt="Pens" />
      <img className="jewelery" src={jewelery} alt="Jewelery" />
      <img className="notebook" src={notebook} alt="Notebook" />
      <img className="airpods" src={airpods} alt="Airpods" />
      <img className="headphones" src={headphones} alt="Headphones" />
      <img className="lavalamp" src={lavalamp} alt="Lavalamp"/>
      <img className="sunnies" src={sunnies} alt="Sunnies" />
      <img className="starbies" src={starbies} alt="Stabucks Cup" />
      <img className="mouse" src={mouse} alt="Mouse pad"/>
      <Calendar></Calendar>
      <Clock></Clock>
      <div class="border-top">
      </div>
    </div>
    </div>
  );
};

export default Portfolio;
