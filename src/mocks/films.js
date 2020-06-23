// films.js
import PropTypes from 'prop-types';

export const fullInfo =
{
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  altPoster: PropTypes.string,
  background: PropTypes.string,
  altBackground: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export const filmsInfo = [
  {
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
  },
  {
    id: 2,
    title: `The Commuter`,
    poster: `img/commuter.jpg`,
    altPoster: `The Commuter poster`,
    background: `img/commuter-bg.jpg`,
    altBackground: `New York City`,
    genre: [`Thriller`, `Action`, `Mystery`],
    year: 2018,
    duration: `1h 45min`,
    age: `16+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
  {
    id: 3,
    title: `Molly's Game`,
    poster: `img/mollys-game.jpg`,
    altPoster: `Molly game poster`,
    background: `img/mollys-game-bg.jpg`,
    altBackground: `New York City`,
    genre: [`Drama`, `Crime`, `Biography`],
    year: 2017,
    duration: `2h 20min`,
    age: `18+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 4,
    title: `Maze Runner`,
    poster: `img/maze-runner.jpg`,
    altPoster: `Maze runner poster`,
    background: `img/maze-runner-bg.jpg`,
    altBackground: `The Maze`,
    genre: [`Action`, `Mystery`, `Sci-Fi`],
    year: 2014,
    duration: `1h 53min`,
    age: `12+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
  {
    id: 5,
    title: `Braven`,
    poster: `img/braven.jpg`,
    altPoster: `Braven poster`,
    background: `img/braven-bg.jpg`,
    altBackground: `Canada nature`,
    genre: [`Action`, `Drama`],
    year: 2018,
    duration: `1h 34min`,
    age: `18+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 6,
    title: `Peter Rabbit`,
    poster: `img/peter-rabbit.jpg`,
    altPoster: `Rabbit poster`,
    background: `img/peter-rabbit-bg.jpg`,
    altBackground: `Nature somewhere`,
    genre: [`Comedy`, `Adventure`, `Family`],
    year: 2018,
    duration: `1h 35min`,
    age: `6+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
  {
    id: 7,
    title: `Journey's End`,
    poster: `img/journeys-end.jpg`,
    altPoster: `Journey poster`,
    background: `img/journeys-end-bg.jpg`,
    altBackground: `First World War`,
    genre: [`Drama`, `War`],
    year: 2017,
    duration: `1h 47min`,
    age: `16+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 8,
    title: `Deadpool 2`,
    poster: `img/deadpool2.jpg`,
    altPoster: `Deadpool poster`,
    background: `img/deadpool2-bg.jpg`,
    altBackground: `Snow falls`,
    genre: [`Adventure`, `Action`, `Comedy`],
    year: 2018,
    duration: `1h 59min`,
    age: `18+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
  {
    id: 9,
    title: `Cargo`,
    poster: `img/cargo.jpg`,
    altPoster: `Cargo poster`,
    background: `img/cargo-bg.jpg`,
    altBackground: `Australias nature`,
    genre: [`Sci-Fi`, `Drama`, `Horror`],
    year: 2017,
    duration: `1h 45min`,
    age: `18+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
  {
    id: 10,
    title: `The Grand Budapest Hotel`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    altPoster: `The Grand Budapest Hotel poster`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    altBackground: `The Grand Budapest Hotel`,
    genre: [`Adventure`, `Crime`, `Comedy`],
    year: 2014,
    duration: `1h 39min`,
    age: `16+`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
];

export const promoMovie = {
  id: 10,
  title: `The Grand Budapest Hotel`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  altPoster: `The Grand Budapest Hotel poster`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  altBackground: `The Grand Budapest Hotel`,
  genre: [`Adventure`, `Crime`, `Comedy`],
  year: 2014,
  duration: `1h 39min`,
  age: `16+`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};
