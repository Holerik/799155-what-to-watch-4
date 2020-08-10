// video.e2e.test.js
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withVideo from './with-video.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const Player = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      {children}
      <button type="button" onClick={onPlayButtonClick}/>
    </div>
  );
};

Player.propTypes = {
  onPlayButtonClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

describe(`Video e2e tests`, () => {
  it(`Checks video on (play) when isPlaying prop becomes true`, () => {
    const VideoPlayer = withVideo(Player);
    const wrapper = mount(
        <VideoPlayer
          src={``}
          isMuted={false}
          poster={``}
          width={200}
          isPlaying={false}
          onStopPlayMovie={() => {}}
        />
    );
    window.HTMLMediaElement.prototype.play = () => {};
    const {_videoRef} = wrapper.instance();
    jest.spyOn(_videoRef.current, `play`);
    wrapper.instance().componentDidMount();
    wrapper.find(`button`).simulate(`click`);
    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });
});
