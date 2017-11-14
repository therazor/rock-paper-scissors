import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <header>
              <ul>
                  <li><button className="pick-player-type computer">Computer</button></li>
                  <li><button className="pick-player-type human" disabled>Human</button></li>
              </ul>
          </header>

          <main role="main">
              <div className="player player-1 computer">
                  <div className="player-type">Computer</div>
                  <div className="hand rock"></div>
              </div>

              <div className="player player-2">
                  <div className="player-type human">You</div>
                  <div className="player-type computer">Computer 2</div>
                  <div className="hand rock"></div>
              </div>
          </main>
        </div>

        <ul className="action-picker">
            <li><button className="pick-action ir rock">Rock</button></li>
            <li><button className="pick-action ir paper">Paper</button></li>
            <li><button className="pick-action ir scissors">Scissors</button></li>
        </ul>

        <div className="outcome">
            <span></span>
        </div>
      </div>
    );
  }
}

export default App;
