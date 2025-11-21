/*/src/index.js*/

/* Creat-React-App defines this index.js as the entry point - it starts here */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* Here I'm saying that the root is App.js (it's the first component) */
const root = ReactDOM.createRoot(document.getElementById("root"));
/* "Find div id=root in my index.html file and insert App.jsx there" */

/* StrictMode is just a dev tool that helps catch issues in the component lifestyle
   It can cause issues because it mounts-> unmounts-> mounts to test that the useEffects can handle it  
   ...so useEffects will run teice in dev mode
*/
/* BrowserRouter:
 */
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

/* Build process: 
1. I type npm run start -> looks at package.json to see what start script says
2. start script tells it to "react-scripts start"
3. react-scripts reads the Webpack config that was already defined by create-react-app(CRA) and starts the 
    webpack server aka webpack-dev-server
   Webpack config defines the entry point: index.js (this file)
4. Webpack loads this file where it learns that the root is App.jsx (or whatever I make it)
5. React finds <div id="root"> in index.html and renders the reat tree there
6. Webpack bundles everything recursivly - index.js-> App.jsx-> child components - turns it all into minifies js
7. Dev server injects JS bundle into the html page
*/

/* If I was using Vite instead of create-react-app:
- Vite doesnt use webpack-dev-server it has its own faster dev server(esbuild)
- Vite does NOT bundle code for dev
- It serves ES Modules straight to the browser
- index.html ->  imports main.jsx 
- It intercepts imports, transforms them super fast with esbuild  and serves directly to the browser
- Its not bundleing everything its changing the files individually (jsx-> js etc)
- For the Node modules-> uses esbuild to make pre-optimised library modules
- Has HMR: Hot Module REplacement- recompiles only the files that change
- For production builds it does bundle them but uses Rollup instead of Webpack
- Just now realising I should have used Vite instead of CRA

*/
