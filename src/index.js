// index.js
import ReactDom from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from '../src/components/app/app.jsx';
import {reducer} from './reducer.js';

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <App
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
