import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/cards/card';

//this how you add state to your component. 
class App extends Component {
  constructor(props) {
    super(props);
    
    this.createCards = this.createCards.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.suffleCards = this.suffleCards.bind(this);


    this.state = {
      cards: this.createCards(),
    };
  }

  ////LOOK OVER THIS!!! COMPARE NOTES
  suffleCards() {
    console.log("suffle");
    //slice method on the temp variable creates a copy of the array, so we can manipulate it without changing the state of the card
    var temp = this.state.cards.slice();
    temp.sort(function(a,b) {
      return 0.5 - Math.random();
    });
    this.setState({cards: temp});
  }
  //this callback takes the parameters foo and foo1 from the child to the parent.
  //why do we want to do this? the game needs to run from the parent function, not the child function(s)
  onCardClick(id) {
    this.suffleCards();
  }

  createCards() {
    let cardComponents = [];
    for(let i = 0; i < 9; i++) {
      // can pass these data attr to the card.js component
      cardComponents.push(<Card key={i} id={i} callBackFromParent={this.onCardClick}></Card>);
    }
    //in the iteration above we do need to set our variable locally in the function but when we stop out of it, we need to use setState method to create an object pair with cards as the key and cardComponents as the 

    //why? we can set this as a variable globally, with react we need to set the state in an an object.
    //this.setState( {cards: cardComponents} );
    //this.setState ( {name: "hello world"} );
    return cardComponents;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Clicky Game</h1>
        </header>
        {this.state.cards}
      </div>
    );
  }
}

export default App;
