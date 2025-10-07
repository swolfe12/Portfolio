import { useState } from 'react';
import unicorn_duck from './../../assets/unicorn_duck.png';
import reading_duck from './../../assets/reading_duck.png';
import surfing_duck from './../../assets/surf_duck.png';

const tabs = [
  { key: 'accessible', label: 'Accessible', image: reading_duck, subtitle: 'Built for everyone' },
  { key: 'fast', label: 'Fast', image: surfing_duck, subtitle: 'Quick as a quack' },
  { key: 'mobile', label: 'Responsive', image: unicorn_duck , subtitle: 'Waddles on all screens' },
];

const Ducks = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="ducks">
      <h2>I can help you get your ducks in a row</h2>

      <div className="ducks__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`ducks__tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <img src={tab.image} alt={tab.label} className="ducks__image" /><br/>
            {tab.label}
            
          </button>
        ))}
      </div>

      <div className="ducks__content">
        {tabs.map((tab) =>
          activeTab === tab.key ? (
            <div key={tab.key} className="ducks__pane">
                <p>{tab.subtitle}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Ducks;
