// index.js
import ReactDom from 'react-dom';
import React from 'react';
import App from '../src/components/app/app.jsx';

const promoMovie = {
  genre: `Drama`,
  year: 2014,
};

const movieTitles = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`
];

const init = () => {
  ReactDom.render(
      <App
        promoMovie={promoMovie}
        movieTitles={movieTitles}
      />,
      document.querySelector(`#root`)
  );
};

init();
