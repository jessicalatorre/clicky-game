
import './card.css';
import React from 'react';
import { Component } from 'react';


//if yoiu want to pass data from the parent component, use props
//state is my own state of the component. can store user interaction in state for each component
// But best practice IRW is to store component states in one central place.
class Card extends Component {
    constructor (props) {
        super(props);
        this.onCardClick = this.onCardClick.bind(this);
        //this line with bind helps you run the functin with component's scope.
        // so if we ever need to access a component's scope, we need to code something linke linke 16 in order to use. this.props id on line 26
        this.testFunction = this.testFunction.bind(this);

        this.myStr = "hello";
    }
    // NOTE: can pass callback function to children, so that when the child function exectures, the parent function will also execute. We then pass the data from the child --with the new parameters--back to the parent via cb, so that when the code executes we pass these data to the parent when it runs.
    onCardClick() {
        this.props.callBackFromParent(this.props.id);
        //this.props.parentFunction("foo", "foo1");
    }

    testFunction() {
        console.log(this.props.id);
    }

    render () {
        return (
            // this. refers to the overll component and onCardClick refers to the helper function above
            <div className="card" onClick={this.onCardClick}>
            {/* below, we pass data attr to compoents. how? Props stores the data from the parent. NOTE that state stores your component specific data */}
                {this.props.id}
            </div>
        )
    }
}

export default Card;




