// selectors.test.js
import {
  getPromoMovie,
  getGenre,
  getGenresList,
  getMoviesList,
  getCardsCount,
  getFavoritesCount,
  getFilmsByGenre,
  getFavoriteFilms,
} from './selectors';

const promoMovie = {
  id: 4,
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
};

const films = [
  {
    id: 1,
    title: `Joker`,
    poster: `img/joker.jpg`,
    altPoster: `Joker poster`,
    background: `img/joker-bg.jpg`,
    altBackground: `Gotham City`,
    genre: [`Crime`],
    year: 2019,
    duration: `2h 2min`,
    age: `18+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `4.3`,
      level: `very good`,
      count: 150,
    },
    director: `Todd Phillips`,
    starring: [`Joaquin Phoenix`, `Zazie Beetz`, `Robert De Niro`, `Bryan Callen`, `Shea Whigham`, `Frances Conroy`, `Glenn Fleshler`, `Brett Cullen`, `Marc Maron`],
    description: `The origin tale of the Joker (Joaquin Phoenix) – one of the most iconic villains in comic book history.`,
    review: `Arthur Fleck (Joaquin Phoenix) isn’t happy with his life. He struggles to make money as a part-time clown while sharing a rundown apartment with his ailing mom (Frances Conroy). But Arthur lives in a city struck by hard times where a decent, honest living is difficult to come by. He also suffers from a condition that causes him to break into uncontrollable laughter. None of this stops Arthur from dreaming big. He aspires to be a stand-up comedian and attempts to write jokes in his diary. Caught in between it all, Arthur slowly begins to lose his grip on sanity`,
    favorite: false,
  },
  {
    id: 2,
    title: `The Commuter`,
    poster: `img/commuter.jpg`,
    altPoster: `The Commuter poster`,
    background: `img/commuter-bg.jpg`,
    altBackground: `New York City`,
    genre: [`Action`],
    year: 2018,
    duration: `1h 45min`,
    age: `16+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    rating: {
      score: `6.3`,
      level: `Good`,
      count: 550,
    },
    director: `Jaume Collet-Serra`,
    starring: [`Liam Neeson`, `Vera Farmiga`, `Patrick Wilson`, `Jonathan Banks`, `Sam Neill`, `Elizabeth McGovern`, `Killian Scott`, `Shazad Latif`, `Andy Nyman`],
    description: `An Insurance Salesman/Ex-Cop is caught up in a criminal conspiracy during his daily commute home`,
    review: `Now a hard-working life insurance salesman and a caring family man, the former police officer, Michael MacCauley, has taken the commuter rail to New York for the past ten years. But, unexpectedly, things will take a turn for the worse, when on one of his daily journeys, the cryptic passenger, Joanna, makes Michael a generous and tempting offer to locate a single commuter or face grave consequences`,
    favorite: false,
  },
  {
    id: 3,
    title: `Molly's Game`,
    poster: `img/mollys-game.jpg`,
    altPoster: `Molly game poster`,
    background: `img/mollys-game-bg.jpg`,
    altBackground: `New York City`,
    genre: [`Biography`],
    year: 2017,
    duration: `2h 20min`,
    age: `18+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `7.4`,
      level: `Good`,
      count: 350,
    },
    director: `Aaron Sorkin`,
    starring: [`Jessica Chastain`, `Idris Elba`, `Kevin Costner`, `Michael Cera`, `Jeremy Strong`, `Chris O'Dowd`, `J.C. MacKenzie`, `Brian d'Arcy James`, `Bill Camp`, `Graham Greene`],
    description: `The true story of Molly Bloom, an Olympic-class skier who ran the world's most exclusive high-stakes poker game and became an FBI target`,
    review: `Molly Bloom, a beautiful young Olympic-class skier, ran the world's most exclusive high-stakes poker game for a decade before being arrested in the middle of the night by 17 FBI agents wielding automatic weapons. Her players included Hollywood royalty, sports stars, business titans, and finally, unbeknownst to her, the Russian mob`,
    favorite: true,
  },
];

describe(`Data selectors tests`, () => {
  it(`getPromoMovie must return promo film`, () => {
    expect(getPromoMovie({DATA: {promo: promoMovie}})).toEqual(promoMovie);
  });
  it(`getGenre must return current genre`, () => {
    expect(getGenre({DATA: {genre: `Drama`}})).toEqual(`Drama`);
  });
  it(`getGenresList must return genres list`, () => {
    expect(getGenresList({DATA: {genresList: `Crime, Action, Biography`}})).toEqual(`Crime, Action, Biography`);
  });
  it(`getMoviesList must return all movies`, () => {
    expect(getMoviesList({DATA: {moviesList: films}})).toEqual(films);
  });
  it(`getCardsCount must return count of movies`, () => {
    expect(getCardsCount({DATA: {cardsCount: 3}})).toEqual(3);
  });
  it(`getFavoritesCount must return count of favorite movies`, () => {
    expect(getFavoritesCount({DATA: {favoritesCount: 1}})).toEqual(1);
  });
  it(`getFilmsByGenre must return selected movies`, () => {
    expect(getFilmsByGenre({
      DATA: {
        moviesList: films,
        genre: `Action`,
        promo: promoMovie,
      },
      MOVIE: {
        movie: promoMovie,
      },
    })).toEqual([films[1]]);
  });
  it(`getFavoriteFilms must return favorite movies`, () => {
    expect(getFavoriteFilms({
      DATA: {
        moviesList: films,
        promo: promoMovie,
      }
    })).toEqual([films[2]]);
  });
});
