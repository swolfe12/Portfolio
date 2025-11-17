// src/pages/MyPhone.jsx
import { useState } from 'react';
import Phone from '../components/Phone';
import answer from './../assets/hangup.PNG';
import hangup from '../assets/answer.PNG';

const MyPhone = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (pageId) => {
    switch (pageId) {
      case 'home':
        setCurrentPage('home');
        break;
      case 'projects':
        setCurrentPage('projects');
        break;
      case 'skills':
        setCurrentPage('skills');
        break;
      case 'links':
        setCurrentPage('links');
        break;
      case 'resume':
        setCurrentPage('resume');
        break;
      case 'about':
        setCurrentPage('about');
        break;
      default:
        setCurrentPage('home');
    }
  };

  return (
    <div className="myPhone">
      <Phone currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="btn-bar">
        <img src={answer} className="answer-call" alt="Answer Call Button" />
        <div className="home-btn"></div>
        <img src={hangup} className="end-call" alt="End Call Button" />
      </div>
    </div>
  );
};

export default MyPhone;
