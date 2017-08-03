import React, { Component } from 'react';
import './App.css';
import havamalEnglish from './data/havamal-english.js'

class App extends Component {
  getVerse() {
    const verse = window.location.hash.split('#')[1];
    if (!verse) {
      return this.randomHavamal();
    }
    return verse - 1;
  }

  randomHavamal() {
    var min = 0;
    var max = havamalEnglish.length;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  displayHavamal(currentHavamal){
    return havamalEnglish[currentHavamal];
  }

  render() {
    const verse = this.getVerse();
    return (
      <div className="havamal">
        <div className="verse">
          <p>{this.displayHavamal(verse)}</p>
          <em className="citation">Havamal: {verse + 1}</em>
        </div>
      </div>
    );
  }
}

export default App;
