import wcc from './../../assets/WCC.png';
import greatreads from './../../assets/goodreads.png';
import sam from './../../assets/sam.png';
import title from './../../assets/title.png';

const GenericSite = () => {
    return (
        <div className="generic">
          <div className="hero"  >
            <div className="left">
              <img src={title} alt="Sam Wolfe - Software Engineer"></img>
            </div>
            <div className="right">
              <img src={sam} alt="Sam Wolfe"></img>
            </div>
            

          </div>
          <div className="work">
            <h2>My Work</h2>
            <div className="card">
              <a href="index.html" target="_blank" className="" >
                <div className="front">
                  <div className="imgContainer">
                    <img src={greatreads} alt="Greadreads Website"></img>
                  </div>
                  <div className="description">
                  <h2>Greatreads</h2>
                  <h3>Tech Stack:</h3>
                  <ul>
                    <li>Java</li>
                    <li>React.js</li>
                    <li>HTML5</li>
                    <li>CSS#</li>
                  </ul>
                  <ul>
                    <li>PostgreSQL</li>
                    <li>Railway</li>
                    <li>Vercel</li>
                  </ul>
                  </div>
                </div>
                <div className="back">
                 
                </div>
              </a>
            </div>
            <div className="card">
              <a href="index.html" target="_blank" className="" >
                <div className="front">
                  <div className="imgContainer">
                    <img src={wcc} alt="WCC website"></img>
                  </div>
                  <div className="description">
                  <h2>Woodstock Community Church Website</h2>
                  <h3>Tech Stack:</h3>
                  <ul>
                    <li>JavaScript</li>
                    <li>HTML5</li>
                    <li>CSS#</li>
                  </ul>
                  </div>
                </div>
                <div className="back">
                 
                </div>
              </a>
            </div>
  
          </div>
        </div>
      );
    };
    
    export default GenericSite;