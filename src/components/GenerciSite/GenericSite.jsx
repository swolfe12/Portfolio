import wcc from './../../assets/WCC.png';
const GenericSite = () => {
    return (
        <div className="generic">
          <div className="hero">
            <h1>Hello! I'm Sam Wolfe</h1>
            <h2>Software Engineer. Front-end Developer.</h2>
          </div>
          <div className="work">
            <h2>My Work</h2>
            <div className="card">
              <a href="" target="_blank" className="" >
                <div className="front">
                  <div className="imgContainer">
                    <img src={wcc} alt="WCC website"></img>
                  </div>
                  <div className="description">
                  <h2>Woodstock Community Church Website</h2>
                  <p>I made this static site for Woodstock Community Church focusing on accesibility and maintainability.</p>
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