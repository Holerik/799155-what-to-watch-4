// video-player.jsx
import React from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends React.PureComponent {

  render() {
    const {isPlaying, buttonPlayerClickHandler, buttonExitClickHandler,
      buttonFullScreenHandler, isMuted, progress, duration, children} = this.props;
    const divStyle = {
      left: `${`${progress}%`}`,
    };

    return (
      <React.Fragment>
        <div className="player">
          {children}
          <button type="button" className={`player__exit ${isMuted ? `visually-hidden` : ``}`}
            onClick={(evt) => {
              buttonExitClickHandler(evt);
            }}
          >Exit</button>

          <div className={`player__controls ${isMuted ? `visually-hidden` : ``}`}>

            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value={`${progress}`} max="100"></progress>
                <div className="player__toggler" style={divStyle}>Toggler</div>
              </div>
              <div className="player__time-value">{duration}</div>
            </div>

            <div className="player__controls-row">
              <button type="button" className="player__play"
                onClick={(evt) => {
                  buttonPlayerClickHandler(evt);
                }}
              >
                <svg
                  viewBox={isPlaying ? `0 0 19 19` : `0 0 20 20`}
                  width={isPlaying ? `19` : `20`}
                  height={isPlaying ? `19` : `20`}
                >
                  {!isPlaying &&
                    (<use xlinkHref="#play-s"></use>)
                  }
                  {isPlaying &&
                    (<use xlinkHref="#pause"></use>)
                  }
                </svg>
                <span>{isPlaying ? `Play` : `Pause`}</span>
              </button>
              <div className="player__name">Transpotting</div>

              <button type="button" className="player__full-screen"
                onClick={(evt) => {
                  buttonFullScreenHandler(evt);
                }}
              >
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPlayer;

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  buttonPlayerClickHandler: PropTypes.func.isRequired,
  buttonExitClickHandler: PropTypes.func.isRequired,
  buttonFullScreenHandler: PropTypes.func.isRequired,
  isMuted: PropTypes.bool.isRequired,
  canPlay: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  duration: PropTypes.string.isRequired,
};
