import React, { useState } from 'react';
import MashGame from './MashGame';
import mashImg from './../../assets/mash.png'

const MashImage = () => {
  const [showGame, setShowGame] = useState(false);

  const handleClick = () => {
    setShowGame(true);
  };

  return (
    <div>
      <img
      className='mash'
        src={mashImg}
        alt="MASH"
        onClick={handleClick}
        style={{ cursor: 'pointer', width: '200px' }} // Adjust size as needed
      />
      {showGame && <MashGame onClose={() => setShowGame(false)} />}
    </div>
  );
};

export default MashImage;
