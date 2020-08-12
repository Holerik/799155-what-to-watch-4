// review.test.js
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {ActionType, Operation, mockReview, reducer} from './review.js';

const api = createAPI(() => {});

const movie = {
  id: 1,
  title: `Joker`,
  poster: `img/joker.jpg`,
  altPoster: `Joker poster`,
  background: `img/joker-bg.jpg`,
  altBackground: `Gotham City`,
  genre: [`Thriller`, `Crime`, `Drama`],
  year: 2019,
  duration: `2h 2min`,
  age: `18+`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  rating: {
    score: `8.1`,
    level: `very good`,
    count: 950,
  },
  director: `Wes Anderson`,
  starring: [`Ralph Fiennes`, `F. Murray Abraham`, `Mathieu Amalric`, `Adrien Brody`, `SWillem Dafoe`, `Jeff Goldblum`, `	Harvey Keitel`, `Jude Law`, `Bill Murray`],
  description: `Wes Anderson's THE GRAND BUDAPEST HOTEL recounts the adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend`,
  review: `GRAND BUDAPEST HOTEL recounts the adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend. The story involves the theft and recovery of a priceless Renaissance painting and the battle for an enormous family fortune`,
  reviews: [1],
  favorite: false,
};

const filmComments = [
  {
    id: 1,
    user: {
      id: 1,
      name: `Some User`
    },
    rating: 9,
    comment: `Some comment`,
    date: `Sun Mar 15 2020`
  }
];

const reviews = filmComments.map((review) => {
  return {
    id: review.id,
    authorId: review.user.id,
    author: review.user.name,
    rating: `${review.rating}`,
    date: review.date,
    text: review.comment,
  };
});

describe(`Review operation tests`, () => {
  it(`Should make a correct API call to get comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadReviews(movie);

    apiMock
    .onGet(`/comments/1`)
    .reply(200, filmComments);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: reviews,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_LOAD_STATUS,
          payload: true,
        });
      });
  });
  it(`Should make a correct API call to push comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const review = {
      rating: 1,
      comment: ``,
    };
    const pushComment = Operation.pushComment(movie, review);

    apiMock
    .onPost(`/comments/1`)
    .reply(200);

    return pushComment(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_LOAD_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_SUBMIT_BLOCK,
          payload: false,
        });
      });
  });
});

describe(`Review reducer tests`, () => {
  it(`Reducer without paramters should return initialState`, () => {
    expect(reducer(void 0, {})).toEqual({
      reviews: [mockReview],
      loadStatus: false,
      submitIsBlocked: false,
    });
  });
  it(`Reducer should set load status`, () => {
    expect(reducer({
      reviews: [],
      loadStatus: false,
      submitIsBlocked: false,
    }, {
      type: ActionType.SET_LOAD_STATUS,
      payload: true,
    })).toEqual({
      reviews: [],
      loadStatus: true,
      submitIsBlocked: false,
    });
  });
  it(`Reducer should set submit block status`, () => {
    expect(reducer({
      reviews: [],
      loadStatus: false,
      submitIsBlocked: false,
    }, {
      type: ActionType.SET_SUBMIT_BLOCK,
      payload: true,
    })).toEqual({
      reviews: [],
      loadStatus: false,
      submitIsBlocked: true,
    });
  });
  it(`Reducer should load reviews`, () => {
    expect(reducer({
      reviews: [],
      loadStatus: false,
      submitIsBlocked: false,
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: [mockReview],
    })).toEqual({
      reviews: [mockReview],
      loadStatus: false,
      submitIsBlocked: false,
    });
  });
});
