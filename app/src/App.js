import React from 'react';
import './App.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    
    this.options = [ 'rock', 'paper', 'scissors' ];
    this.grid = {};
    this.state = {};
    this.uScore = 0;
    this.cScore = 0;
    this.cChoice = '';
    this.uChoice = '';
    this.res = '';

    this.options.forEach( (option, i) => {
      this.grid[option] = {};
      this.grid[option][option] = 'Tie';
      this.grid[option][this.options[(i+1)%3]] = this.options[(i+1)%3] + ' wins';
      this.grid[option][this.options[(i+2)%3]] = option + ' wins';
    });
  }
  
  choose = (choice1, choice2) => {
    return( this.grid[choice1][choice2] );
  };

  chooser = () => {
    return this.options[Math.floor( Math.random() * this.options.length )];
  }

  submitHandler = event => {
    event.preventDefault();
    let emptyCount = 0;
    let form = document.getElementById('form');
    let inputs = Array.from(document.getElementsByTagName('input'));
    
    inputs.forEach( input => {
      if( input.checked ) {
        this.uChoice = input.id;
        this.cChoice = this.chooser();
        this.res = this.choose(this.uChoice, this.cChoice);
        this.uScore = this.res.indexOf(this.uChoice) === 0 ? this.uScore = this.uScore + 1 : this.uScore;
        this.cScore = this.res.indexOf(this.cChoice) === 0 ? this.cScore = this.cScore + 1 : this.cScore;

        this.updateDOM();
        form.reset();
      } else {
        if( emptyCount >= inputs.length - 1 ) {
          document.getElementById('prompt').innerText = 'Try Making a Selection…';
          return false;
        } else {
          emptyCount++;
        }
      }
    });
  }

  updateDOM = () => {
    this.setState( (state) => ({
      uChoice : this.uChoice,
      cChoice : this.cChoice,
      res : this.res,
      uScore: this.uScore,
      cScore: this.cScore
    }));
  }

  render() {
    return (
      <div className="Game">
        <h1>Make a move:
          <span id="prompt">{this.state.res}</span>
        </h1>
        <h2>
          User Played: <span id="userPlay">{this.state.uChoice}</span>
          <br /><br />
          AI Played: <span id="compPlay">{this.state.cChoice}</span>
        </h2>
        <h2>Score:</h2>
        <h4>User : 
          <span id="user">{this.state.uScore}</span>
        </h4>
        <h4>Computer : 
          <span id="comp">{this.state.cScore}</span>
        </h4>
        <form id="form">
          <label>
            Rock
            <input type="radio" value="rock" name="option" id="rock" />
          </label>
          <label>
            Paper
            <input type="radio" value="paper" name="option" id="paper" />
          </label>
          <label>
            Scissors
            <input type="radio" value="scissors" name="option" id="scissors" />
          </label>
          <br /><br />
          <button type="submit" value="Submit" id="submit" onClick={this.submitHandler.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Game;
