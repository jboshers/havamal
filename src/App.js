import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import havamalEnglish from './data/havamal-english.js';
import havamalNorse from './data/havamal-norse.js';

class App extends Component {
  constructor(props){
    super(props);
    this.getRandom = this.getRandom.bind(this);
    this.state = {
      verse: this.getVerse()
    };
  }

  getVerse(stanza) {
    const verse = stanza || window.location.hash.split('#')[1];
    if (verse === 'random') {
      return this.randomHavamal();
    } else {
      return this.havamalByDate();
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

  getRandom() {
    this.setState({
      verse: this.getVerse('random')
    })
  }

  havamalByDate() {
    const doy = moment().dayOfYear();
    return doy === 164 ? (164 - 1) : doy % (164 + 1);
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
    const verse = this.state.verse;
    return (
      <div className="havamal">
        <div className="verse" key={verse}>
          <div key={verse}>
            <p className="verse__english">{this.displayHavamalEnglish(verse)}</p>
            <p className="verse__norse">{this.displayHavamalNorse(verse)}</p>
            <em className="citation">Havamal: {verse + 1}, {this.whichPoem(verse + 1)}</em>
          </div>
        </div>
          <a className="randomLink" onClick={this.getRandom}>Random Stanza</a>
      </div>
    );
  }
}

export default App;
