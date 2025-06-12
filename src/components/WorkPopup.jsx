import { useState } from 'react';
import signImage from '../assets/work-sign.png';

const WorkPopup = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="popup-close" onClick={() => setVisible(false)}>×</button>
        <img src={signImage} alt="Work in Progress" className="sign-img" />
      </div>
    </div>
  );
};

export default WorkPopup;
