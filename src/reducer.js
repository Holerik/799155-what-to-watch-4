// reducer.js
import {combineReducers} from 'redux';
import {reducer as data} from './reducer/data/data.js';
import {reducer as movie} from './reducer/movie/movie.js';
import {reducer as user} from './reducer/user/user.js';
import NameSpace from './reducer/name-space/name-space.js';

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.MOVIE]: movie,
  [NameSpace.DATA]: data,
});
