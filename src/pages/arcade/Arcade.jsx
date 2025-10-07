// src/components/FunSite/Arcade/Arcade.jsx
import React from 'react';
import avatar from '../../assets/avatar3.png';
import Navbar from '../../components/NavBar.tsx';
import butterfly1 from '../../assets/butterfly1.png';
import butterfly2 from '../../assets/butterfly2.png';
import screensaver from '../../assets/screensaver.jpg';

export const Arcade = ({ isArcade = true, onNavigate }) => {
  return (
    <div className='arcade' id="home" style={{ backgroundImage: `url(${screensaver})` }}>
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />
      <div className="grid">
        <div className="avatar">
          <img src={avatar} alt="Sam avatar" />
        </div>
        <div className="about-blob" role="region" aria-labelledby="about-title">
          <h2 id="about-title">
            <span className="hey">Hey, everyone!</span> I’m Sam!
          </h2>
          <p className="kicker">
            Welcome to my site. Click the buttons below to see what I’m all about!
          </p>

          <ul className="about-links">
            <li>
              <a href="#fortune">
                <span className="dot" aria-hidden="true" />
                <span className="title">front-end fun</span>
                <span className="sub">what’s in the cards for you?</span>
              </a>
            </li>
            <li>
              <a href="#story">
                <span className="dot" aria-hidden="true" />
                <span className="title">back-end basics</span>
                <span className="sub">it’s all about me!</span>
              </a>
            </li>
            <li>
              <a href="#look">
                <span className="dot" aria-hidden="true" />
                <span className="title">accessibility</span>
                <span className="sub">the scoop on my style</span>
              </a>
            </li>
            <li>
              <a href="#trivia">
                <span className="dot" aria-hidden="true" />
                <span className="title">UI/UX  design</span>
                <span className="sub">a few fave facts</span>
              </a>
            </li>
            <li>
              <a href="#wallpaper">
                <span className="dot" aria-hidden="true" />
                <span className="title">wallpaper</span>
                <span className="sub">a cool pic for your computer</span>
              </a>
            </li>
            <li>
              <a href={isArcade ? "/links" : "#"} onClick={(e) => {
                if (!isArcade && onNavigate) {
                  e.preventDefault();
                  onNavigate('links');
                }
              }}>
                <span className="dot" aria-hidden="true" />
                <span className="title">links</span>
                <span className="sub">meet all my fab friends!</span>
              </a>
            </li>
          </ul>

          <img className="butterfly1" src={butterfly1} alt="" />
          <img className="butterfly2" src={butterfly2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Arcade;
