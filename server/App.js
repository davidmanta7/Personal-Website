import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends Component {
  render() {
    return (
      <div className = "App-TOP">
          <h className = "App-header">
            UF RecSports
            </h>

          <p className = "App-text">
            pepeepee
          </p>



        </div>
    );
  }
}

const BUTTONS = ['Default'];

function renderDropdownButton(title, i) {
  return (
    <DropdownButton
      bsStyle={title.toLowerCase()}
      title={title}
      key={i}
      id={`dropdown-basic-${i}`}
    >
      <MenuItem eventKey="1">Period 1</MenuItem>
      <MenuItem eventKey="2">Period 2</MenuItem>
      <MenuItem eventKey="3">Period 3</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">No Class</MenuItem>
    </DropdownButton>
  );
}

const buttonsInstance = (
  <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
);

render(buttonsInstance);



//<a
//  className="App-link"
//  href="https://reddit.com" // Page destination
//  target="_blank" //Open up new page
//>
//  Learn React
//</a>

export default App;
