// index.js
import ReactDom from 'react-dom';
import React from 'react';
import App from '../src/components/app/app.jsx';

const promoData = {
  genre: `Drama`,
  year: 2014,
};

const init = () => {
  ReactDom.render(
      // eslint-disable-next-line no-trailing-spaces
      <App
        genre={promoData.genre}
        year={promoData.year}
      />,
      document.querySelector(`#root`)
  );
};

init();
