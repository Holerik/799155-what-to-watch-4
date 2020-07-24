// data.test.js
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {ActionType, Operation, getMovieObject} from './data.js';

const api = createAPI(() => {});

const films = [
  {
    [`background_color`]: `#929FA5`,
    [`background_image`]: `Bohemian_Rhapsody.jpg`,
    description: `Bohemian Rhapsody is a foot-stomping celebration of Queen`,
    director: `Bryan Singer`,
    genre: `Drama`,
    id: 1,
    [`is_favorite`]: false,
    name: `Bohemian Rhapsody`,
    [`poster_image`]: `Bohemian_Rhapsody.jpg`,
    [`preview_image`]: `bohemian_rhapsody.jpg`,
    [`preview_video_link`]: `video link 1`,
    rating: 6.1,
    released: 2018,
    [`run_time`]: 134,
    [`scores_count`]: 338903,
    starring: [`Rami Malek`, `Lucy Boynton`, `Gwilym Lee`],
  },
];

const movies = [
  getMovieObject(films[0]),
];

describe(`Data operation tests`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
    .onGet(`/films`)
    .reply(200, films);

    return moviesLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(5);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_MOVIES,
        payload: movies,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_GENRES_LIST,
        payload: [`All genres`, `${films[0].genre}`],
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.SET_CURRENT_GENRE,
        payload: `All genres`,
      });
      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.SET_CARDS_COUNT,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(5, {
        type: ActionType.SET_FAVORITES_COUNT,
        payload: 0,
      });
    });
  });
});
