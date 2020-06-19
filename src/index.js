// index.js
import ReactDom from 'react-dom';
import React from 'react';
import App from '../src/components/app/app.jsx';
import {filmsInfo} from './mocks/films.js';

const promoMovie = {
  genre: `Drama`,
  year: 2014,
};

const init = () => {
  ReactDom.render(
      <App
        promoMovie={promoMovie}
        filmsInfo={filmsInfo}
      />,
      document.querySelector(`#root`)
  );
};

init();
