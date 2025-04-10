//import $ from "jquery";
import "./styles/style.scss";
import React, { Component, useState } from 'react';
import Portfolio from './Portfolio';
//import logo from './assets/logo.png';
import ad from './assets/ad.png';
import blue from './assets/blue-bg.jpeg';

const SkillsDropdown = () => {
    const skills = {
        "Front-End": ["HTML", "CSS", "JavaScript", "React", "SASS"],
        "Back-End": ["Node.js", "Express", "MongoDB"],
        "Tools": ["Git", "Webpack", "Jest"]
    };

    const [openCategories, setOpenCategories] = useState({});

    const toggleCategory = (category) => {
        setOpenCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    return (
        <div className="skills-dropdown">
            <h2>My Skills</h2>
            {Object.keys(skills).map(category => (
                <div key={category} className="skill-category">
                    <button className="category-btn" onClick={() => toggleCategory(category)}>
                        {category} {openCategories[category] ? "▼" : "►"}
                    </button>
                    {openCategories[category] && (
                        <ul className="skills-list">
                            {skills[category].map(skill => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false
        };
    }

    startGame = () => {
        this.setState({ gameStarted: true });
    };

    render() {
        return (
            <div className="home">
                <div className="nav">
                    <div className="logo">
                        Sam Wolfe
                    </div>
                    
                </div>
                <div className="subnav">
                    
                </div>
                <div className="main-content">
                    <div className="left">   
                        <SkillsDropdown />
                    </div>
                    <div className="center" >
                        <div className="game">
                            <Portfolio />
                            <div className="left-border"></div>
                            {!this.state.gameStarted && (
                                <>
                                    <div className="top-border"></div>
                                    <div className="game-img"></div>
                                    <button className="play-btn" onClick={this.startGame}>
                                        Play Game
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="right" style={{ backgroundImage: `url(${blue})` }}>
                        <img class="ad" alt="advertisement" src={ad}></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
