import React, { Component } from 'react';
import './App.css';
import havamalEnglish from './data/havamal-english.js';
import havamalNorse from './data/havamal-norse.js';
import stream from './stream.jpg'

class App extends Component {
  getVerse() {
    const verse = window.location.hash.split('#')[1];
    if (!verse) {
      return this.randomHavamal();
    }
    return verse - 1;
  }

  whichPoem(verse) {
    if (verse <= 79) {
      return "Gestaþáttr";
    } else if (verse <= 138) {
      return "Loddfáfnismál";
    } else if (verse <= 146) {
      return "Rúnatal";
    } else {
      return "Ljóðatal";
    }
  }

  randomHavamal() {
    var min = 0;
    var max = havamalEnglish.length;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  displayHavamalEnglish(verse){
    return havamalEnglish[verse];
  }

  displayHavamalNorse(verse){
    return havamalNorse[verse];
  }

  render() {
    const verse = this.getVerse();
    return (
      <div className="havamal">
          <div className="verse" key={verse}>
            <p className="verse__english">{this.displayHavamalEnglish(verse)}</p>
            <p className="verse__norse">{this.displayHavamalNorse(verse)}</p>
            <em className="citation">Havamal: {verse + 1}, {this.whichPoem(verse + 1)}</em>
          </div>
      </div>
    );
  }
}

export default App;
