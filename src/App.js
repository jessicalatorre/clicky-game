import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/cards/card';

import blackberry from "./images/blackberry.jpg";
import blueberries from "./images/blueberries.jpg";
import cherries from "./images/cherries.jpg";
import grapes from "./images/grapes.jpg";
import orange from "./images/orange.jpg";
import peaches from "./images/peaches.jpg";
import pears from "./images/pears.jpg";
import plums from "./images/plums.jpg";
import raspberries from "./images/raspberries.jpg";

//this how you add state to your component. 
class App extends Component {
  constructor(props) {
    super(props);
    // this is how you bind the context of the this key word, so it can be called anywhere without losing the original context of this keyword
    //in other words, we're bing the functions below to the Component, so when those function fire they will affect the the Component
    this.createCards = this.createCards.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.suffleCards = this.suffleCards.bind(this);
    this.isCardClicked = this.isCardClicked.bind(this);

    this.state = {
      cards: this.createCards(),
      score: 0,
      clickCards: [],
      message: ""
    };

  }

  isCardClicked(id) {
    for(let i = 0; i < this.state.clickCards.length; i++) {
      if(id == this.state.clickCards[i]) {
        return true;
      }
    }
    return false;
  }
  // EXAMPLE: when state won't change when array is still the same.
  //arr = [1,2,3];

  //newArr = arr;
  //suffle(newArr); [3,2,1] [3,2,1]

  //this won't work because there's no change
  //setState({arr: newArr})
  // changes happen inside and outside of react/angular/backbone
  
  ////LOOK OVER THIS!!! COMPARE NOTES
  suffleCards() {
    console.log("suffle");
    //slice method on the temp variable creates a copy of the array, so we can manipulate it without changing the state of the card
    //if state doesn't change, the compoenent won't rerender. But we want the cards to rerender (as shuffled) without changing the state (the contents of the orignal array; we just want so shuffle those contents)
    //so we create a copy, shuffle the copy, then set the state, which will happen because React will be able to see that the new array is different from the old one
    var temp = this.state.cards.slice();
    temp.sort(function(a,b) {
      return 0.5 - Math.random();
    });
    this.setState({cards: temp});
  }
  //this callback takes the parameters foo and foo1 from the child to the parent.
  //why do we want to do this? the game needs to run from the parent function, not the child function(s)
  onCardClick(id) {
  // happen outside of react
    console.log(id);
    if(this.isCardClicked(id)) {
      this.setState({ 
        score: 0,
        message: "You already clicked that",
        clickCards: []
      });
    } else {
      this.state.clickCards.push(id);
      this.setState({ 
        message: "",
        score: ++this.state.score,
      });
    }

    if(this.state.clickCards.length == 9) {
      this.setState({ 
        message: "You Win!",
      });
    }
    //whereas this is an example of something happening inside React bc of setState function
    //let newTest = ++this.state.test;
    //let newValue = 0;
    //this.setState({test: newTest});
    //console.log(this.state.test);
    //this.state.test += 1 ;
    //this.forceUpdate();

    this.suffleCards();
  }


  createCards() {
    let cardComponents = [];
    var cardImg;
    for(let i = 0; i < 9; i++) {
      // can pass these data attr to the card.js component
      switch(i) {
        case 0: cardImg = blackberry; break;
        case 1: cardImg = blueberries; break;
        case 2: cardImg = cherries; break;
        case 3: cardImg = grapes; break;
        case 4: cardImg = orange; break;
        case 5: cardImg = peaches; break;
        case 6: cardImg = pears; break;
        case 7: cardImg = plums; break;
        case 8: cardImg = raspberries; break;
      }
      cardComponents.push(<Card key={i} id={i} callBackFromParent={this.onCardClick} img={cardImg}></Card>);
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
          <h1 className="App-title">Clicky Game</h1>
        </header>
        {this.state.score}
        {this.state.message}
        {this.state.cards}
      </div>
    );
  }
}

export default App;
