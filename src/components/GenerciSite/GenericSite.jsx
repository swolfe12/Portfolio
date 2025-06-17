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
     
            </div>
            

          </div>
          <div className="work">
            <h2>- My Projects -</h2>
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

          <div className="skills">
            <h2>- My Skills -</h2>  
            <ul>
              <h3>Languages & Frameworks:</h3>
              <li>Java, Spring Boot, Quarkus, Hibernate, JPA</li>
              <li>React, React Native, Angular, Node.js</li>
              <li>HTML5, CSS3, JavaScript (ES6+)</li>
              <li>C#/.NET, Python</li>
            </ul>
            <ul>
              <h3>Infrastructure & Tooling:</h3>
              <li>Git, GitHub Actions, Azure DevOps</li>
              <li>Docker, Kubernetes (OCP/AKS)</li>
              <li>Webpack, Gulp</li>
              <li>CI/CD Pipelines, S3</li>
              <li>Microsoft SQL Server, PostgreSQL, Redis</li>
            </ul>
            
            <ul>
              <h3>Application Architecture:</h3>
              <li>REST APIs, GraphQL, API Design</li>
              <li>Microservices Concepts, Headless CMS</li>
              <li>Agile Development (Scrum/Kanban)</li>
              <li>Sitecore, Optimizely, Grafana, DataDog</li>
            </ul>   

            
          </div>
        </div>
      );
    };
    
    export default GenericSite;