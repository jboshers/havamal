import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import havamalEnglish from './data/havamal-english.js';
import havamalNorse from './data/havamal-norse.js';
import createHistory from 'history/createBrowserHistory'

class App extends Component {
  constructor(props){
    super(props);
    this.getRandom = this.getRandom.bind(this);
    this.history = createHistory();
    this.state = {
      verse: this.searchedStanza() || this.havamalByDate()
    };
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

  searchedStanza() {
    const verse = this.history.location.hash;
    if (verse !== '' && parseInt(verse.slice(1) - 1, 10) < 164 ) {
      return parseInt(verse.slice(1) - 1, 10);
    }
    return null;
  }

  getRandom() {
    const verse =  this.randomHavamal();
    this.history.push('/#' + (verse + 1), verse);
    this.setState({
      verse: verse
    })
  }

  havamalByDate() {
    const doy = moment().dayOfYear();
    return doy === 164 ? (164 - 1) : doy % (164 + 1);
  }

  randomHavamal() {
    var min = 0;
    var max = havamalEnglish.length;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  displayHavamalEnglish(verse){
    return havamalEnglish[verse];
  }

  displayHavamalNorse(verse){
    return havamalNorse[verse];
  }

  render() {
    const verse = this.state.verse;
    const prettyVerse = this.state.verse + 1
    return (
      <div className="havamal">
        <div className="verse" key={verse}>
          <p className="verse__english">{this.displayHavamalEnglish(verse)}</p>
          <p className="verse__norse">{this.displayHavamalNorse(verse)}</p>
          <em className="citation">Havamal: {prettyVerse}, {this.whichPoem(prettyVerse)}</em>
        </div>
          <a className="randomLink" onClick={this.getRandom}>Random Stanza</a>
      </div>
    );
  }
}

export default App;
