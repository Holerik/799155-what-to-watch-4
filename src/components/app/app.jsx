/* eslint-disable react/prop-types */
// app.jsx
import React from 'react';
import Main from '../main/main.jsx';

const App = (props) => {
  return (
    <Main
      genre={props.genre}
      year={props.year}
    />);
};

export default App;
