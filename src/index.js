// index.js
import ReactDom from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from '../src/components/app/app.jsx';
import {createAPI} from './api.js';
import {
  Operation as UserOperation,
  AuthorizationStatus,
  ActionCreator
} from './reducer/user/user.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {Operation as ReviewOperation} from './reducer/review/review.js';
import {ActionCreator as ErrorActionCreator} from './reducer/error/error.js';

const TIMEOUT = 5000;

const onErrorOccured = (errMessage) => {
  store.dispatch(ErrorActionCreator.setErrMessage(errMessage));
  store.dispatch(ErrorActionCreator.showErrMessage(true));
  setTimeout(() => {
    store.dispatch(ErrorActionCreator.showErrMessage(false));
    store.dispatch(ErrorActionCreator.setErrMessage(``));
  }, TIMEOUT);
};

const onAddReviewComment = (movie, comment) => {
  store.dispatch(ReviewOperation.pushComment(movie, comment));
};

const onUnauthorized = (errMessage) => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  onErrorOccured(errMessage);
};

const api = createAPI(onUnauthorized, onErrorOccured);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(UserOperation.checkAuth());
store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadPromoMovie());

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <App
          onAddReviewComment={onAddReviewComment}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();

export default store;
