// src/components/FunSite/Laptop.jsx
import React, { useRef } from 'react';
import useDraggable from './../../hooks/useDraggable';
import laptop from './../../assets/laptop.png';
import screensaver from './../../assets/screensaver.jpg';
import browser from './../../assets/browser.PNG';
import folder from './../../assets/folder.png';

const Laptop = ({ isOpen }) => {
  const screenRef = useRef(null);

  const {
    elementRef: browserRef,
    position: browserPos,
    dragging: browserDragging,
    handleMouseDown: handleBrowserMouseDown
  } = useDraggable(screenRef);

  const {
    elementRef: explorerRef,
    position: explorerPos,
    dragging: explorerDragging,
    handleMouseDown: handleExplorerMouseDown
  } = useDraggable(screenRef);

  return (
    <div
      className={`laptop clickable${isOpen ? ' scale-up active' : ''}`}
      style={{ backgroundImage: `url(${laptop})` }}
      id="laptop"
    >
      <div className="screen" style={{ backgroundImage: `url(${screensaver})` }} ref={screenRef}>
        {/* Draggable Browser */}
        <div
          className={`browser${browserDragging ? ' dragging' : ''}`}
          ref={browserRef}
          style={{
            top: `${browserPos.y}px`,
            left: `${browserPos.x}px`,
            position: 'absolute'
          }}
        >
          <div className="topBar" onMouseDown={handleBrowserMouseDown}>
            <button className="close"></button>
            <button className="minimize"></button>
            <button className="expand"></button>
          </div>
          <div className="terminal">
            <span>Last login: Fri Mar 7 23:58:32 on ttys003</span><br />
            <span>samgwolfe@MacBookAir ~ % hack the mainframe</span><br />
            <span>zsh: command not found: hack</span><br />
            <span>samgwolfe@MacBookAir ~ %</span>
          </div>
          <img src={browser} alt="browser" />
        </div>

        {/* Draggable Explorer */}
        <div
          className={`explorer${explorerDragging ? ' dragging' : ''}`}
          ref={explorerRef}
          style={{
            top: `${explorerPos.y}px`,
            left: `${explorerPos.x}px`,
            position: 'absolute'
          }}
        >
          <div className="topBar" onMouseDown={handleExplorerMouseDown}>
            <h4>File Explorer</h4>
          </div>
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

        <div className='iconBar'>
            
        </div>
      </div>
    </div>
  );
};

export default Laptop;
