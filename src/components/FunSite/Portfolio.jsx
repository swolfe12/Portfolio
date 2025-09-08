// src/components/FunSite/Portfolio.jsx
import React, { useState, useRef, useEffect } from "react";
import "./../../styles/main.scss";
import Calendar from './Calendar';
import Clock from './Clock';
import Laptop from './Laptop';
import MashImg from './MashImage';
import contact from './../../assets/contact.png';
import bgRoom from './../../assets/bg-room.png';
import plant from './../../assets/plant.png';
import coffee from './../../assets/coffee.png';
import gummies from './../../assets/gummies.png';
import pens from './../../assets/pens.png';
import jewelery from './../../assets/jewelery-bowl.png';
import notebook from './../../assets/notebook.png';
import airpods from './../../assets/airpods.png';
import headphones from './../../assets/headphones.png';
import lavalamp from './../../assets/lavalamp.png';
import sunnies from './../../assets/sunnies.png';
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
import clouds from './../../assets/window.mp4';
import speaker from './../../assets/speaker.png';
import neon from './../../assets/neon.png';


const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLaptopOpen, setIsLaptopOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const laptopRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        laptopRef.current &&
        !laptopRef.current.contains(e.target)
      ) {
        setIsLaptopOpen(false);
      }
    };

    if (isLaptopOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLaptopOpen]);

  const handleContactClick = () => {
    setIsLaptopOpen(false);
    setIsContactOpen(prev => !prev);
  };

  return (
    <div className="portfolio">
      <div className="inner-container">

        <div className="bg-img" style={{ backgroundImage: `url(${bgRoom})` }}></div>

        {isModalOpen && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
              <img className="sam-bubble" src={samBubble} alt="Sam Bubble" />
              <p>Hey! Nice to meet you, I'm Sam. Welcome to my room! Feel free to look around!
                <br /><br />
                P.S. I have some cool projects on my laptop. You should check them out!
              </p>
            </div>
          </div>
        )}

        <img className="plant" src={plant} alt="Plant" />
        <img className="coffee" src={coffee} alt="Coffee" />
        <img className="speaker" src={speaker} alt="Speaker" />
        <img className="gummies" src={gummies} alt="Gummies" />

        <div
          className={`contact clickable${isContactOpen ? ' scale-up active' : ''}`}
          style={{ backgroundImage: `url(${contact})` }}
          onClick={handleContactClick}
        >
          <ul>
            <li>(678) 314-8280</li>
            <li>samgwolfe12@gmail.com</li>
          </ul>
        </div>

        <div
          className={`laptop-wrapper${isLaptopOpen ? ' active' : ''}`}
          ref={laptopRef}
          onClick={(e) => {
            if (!isLaptopOpen) setIsLaptopOpen(true);
            e.stopPropagation();
          }}
        >
          {!isLaptopOpen && <div className="laptop-overlay" />}
          {isLaptopOpen && (
            <button
              className="laptop-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsLaptopOpen(false);
              }}
            >
              ✕
            </button>
          )}
          <Laptop
            isOpen={isLaptopOpen}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        </div>

          <img className="neon" src={neon} alt="neon sign" />
        <img className="bulletin" src={bulletin} alt="bulletin" />
        <img className="jellyfish" src={jellyfish} alt="jellyfish" />
        <img className="sam-poster" src={samPoster} alt="Sam Wolfe" />
        <img className="desk" src={desk} alt="desk" />

        <video autoPlay loop muted playsInline className="clouds" id="myVideo">
          <source src={clouds} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <img className="window" src={window} alt="window" />
        <img className="paper" src={paper} alt="paper" />
        <img className="dogs" src={dogs} alt="dogs" />
        <img className="pens" src={pens} alt="Pens" />
        <img className="jewelery" src={jewelery} alt="Jewelery" />
        <img className="notebook" src={notebook} alt="Notebook" />
        <MashImg />
        <img className="airpods" src={airpods} alt="Airpods" />
        <img className="headphones" src={headphones} alt="Headphones" />
        <img className="lavalamp" src={lavalamp} alt="Lavalamp" />
        <img className="sunnies" src={sunnies} alt="Sunnies" />
        <img className="starbies" src={starbies} alt="Starbucks Cup" />
        <img className="mouse" src={mouse} alt="Mouse pad" />

        <Calendar />
        <Clock />
        <div className="border-top"></div>
      </div>
    </div>
  );
};

export default Portfolio;
