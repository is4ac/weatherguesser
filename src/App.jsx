import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import MainMenu from "./components/main-menu.component";
import TempGuessGame from "./components/temp-guess-game";

function App() {
  return (
      <Router>
          <div className="container">
              <Navbar />
              <br/>
              <Route path="/" exact component={MainMenu} />
              <Route path="/cities" exact render={(props) => (
                <TempGuessGame mode="cities" />
              )} />
              <Route path="/maps" exact render={(props) => (
                  <TempGuessGame mode="maps" />
              )} />
              <Route path="/citiesandmaps" exact render={(props) => (
                  <TempGuessGame mode="citiesandmaps" />
              )} />
          </div>
      </Router>
  );
}

export default App;
