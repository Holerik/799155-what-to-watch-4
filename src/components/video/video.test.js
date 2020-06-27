// video.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Video from './video.jsx';

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
};

const MockComponent = () => {
  return (
    <div>
      <Video
        isPlaying={false}
        src={movie.preview}
        isMuted={true}
        poster={movie.poster}
        width={280}
        onExitButtonClick={() => {}}
      />
    </div>
  );
};

describe(`Video tests`, () => {
  it(`Moviecard should rendered as video`, () => {
    const tree = renderer
    .create((
      <MockComponent
      />), {
      createNodeMock() {
        return {};
      }
    }
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

