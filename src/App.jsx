import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import TempGame from "./components/temp-game.component";

function App() {
  return (
      <Router>
          <div className="container">
              <Navbar />
              <br/>
              <Route path="/" exact component={TempGame} />
          </div>
      </Router>
  );
}

export default App;
