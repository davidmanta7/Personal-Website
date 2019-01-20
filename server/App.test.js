import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Ass from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.render(<Ass />, div);
  ReactDOM.unmountComponentAtNode(div);
});
