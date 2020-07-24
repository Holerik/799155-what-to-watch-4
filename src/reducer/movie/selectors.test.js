// selectors.test.js
import {
  getPage,
  getPlayState,
  getFirstCardNumber,
  getLastCardNumber,
} from './selectors';

describe(`Movie selectors tests`, () => {
  it(`getPage must return active page`, () => {
    expect(getPage({MOVIE: {page: 0}})).toEqual(0);
  });
  it(`getPlayState must return current play state`, () => {
    expect(getPlayState({MOVIE: {play: false}})).toEqual(false);
  });
  it(`getFirstCardNumber must return first film card to show`, () => {
    expect(getFirstCardNumber({MOVIE: {firstCard: 9}})).toEqual(9);
  });
  it(`getLastCardNumber must return last film card to show`, () => {
    expect(getLastCardNumber({MOVIE: {lastCard: 12}})).toEqual(12);
  });
});
