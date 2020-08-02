// video-player.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

it(`<VideoPlayer /> should rendered corretly`, () => {
  const tree = renderer
    .create(<VideoPlayer
      isPlaying={true}
      isPaused={false}
      buttonPlayerClickHandler={() => {}}
      buttonExitClickHandler={() => {}}
      buttonFullScreenHandler={() => {}}
      isMuted={true}
      canPlay={true}
      progress={0}
      duration={`1`}
    />
    );
  expect(tree.toJSON()).toMatchSnapshot();
});
