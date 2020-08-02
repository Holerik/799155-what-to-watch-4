// video-player.e2e.test.js
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Player from './video-player.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should play-pause button be pressed`, () => {
  const buttonPlayerClickHandler = jest.fn();
  const buttonExitClickHandler = jest.fn();
  const buttonFullScreenHandler = jest.fn();

  const main = mount(
      <Player
        isPlaying={true}
        isPaused={false}
        buttonPlayerClickHandler={buttonPlayerClickHandler}
        buttonExitClickHandler={buttonExitClickHandler}
        buttonFullScreenHandler={buttonFullScreenHandler}
        isMuted={true}
        canPlay={true}
        progress={0}
        duration={`1`}
      >
        <video />
      </Player>
  );
  main.find(`button.player__play`).simulate(`click`);
  expect(buttonPlayerClickHandler).toHaveBeenCalledTimes(1);
});
