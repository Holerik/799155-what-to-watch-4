// with-video.jsx
import React from 'react';
import PropTypes from 'prop-types';

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const secs = Math.floor(duration - hours * 3600 - minutes * 60);
  const time = `${hours}:${minutes}:${secs}`;
  return time;
};

const onSetFullScreen = (evt) => {
  evt.preventDefault();
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
};

class Video extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      isPlaying: props.isPlaying,
      isPaused: !props.isPlaying,
      canPlay: false,
      isMuted: props.isMuted,
      duration: ``,
    };
    this._videoRef = React.createRef();
    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
  }

  _muteHandler() {
    this.setState((prevState) => (this.setState({isMuted: !prevState.isMuted})));
    const video = this._videoRef.current;
    video.muted = this.state.isMuted;
  }

  componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;
    video.src = src;
    video.autoplay = false;

    video.oncanplaythrough = () => {
      this.setState({canPlay: true});
    };

    video.onplay = () => {
      this.setState({isPlaying: true});
      this.setState({isPaused: false});
    };

    video.oncanplay = () => {
      this.setState({canPlay: true});
    };

    video.onpause = () => {
      this.setState({isPlaying: false});
      this.setState({isPaused: true});
    };

    video.ontimeupdate = () => {
      if (isNaN(video.duration)) {
        return;
      }
      this.setState({progress: Math.floor((video.currentTime * 100) / video.duration)});
      const time = formatDuration(video.duration) + `/` +
        formatDuration(video.duration - video.currentTime);
      this.setState({duration: time});
    };
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.onplay = null;
    video.onpause = null;
    video.oncanplay = null;
    video.oncanplaythrough = null;
    video.ontimeupdate = null;
    video.src = ``;
    this._videoRef = null;
  }

  onPlayButtonClick(evt) {
    evt.preventDefault();
    const video = this._videoRef.current;
    if (this.state.isPlaying) {
      this.setState({isPlaying: false});
      video.playbackRate = 0;
    } else {
      this.setState({isPlaying: true});
      video.playbackRate = 1;
    }
  }

  render() {
    const {isMuted} = this.props;
    const {isPlaying} = this.state;
    const divStyle = {
      left: `${`${this.state.progress}%`}`,
    };

    return (
      <React.Fragment>
        <div className="player">
          <button type="button" className={`player__exit ${isMuted ? `visually-hidden` : ``}`}
            onClick={(evt) => {
              this.props.onExitButtonClick(evt);
            }}
          >Exit</button>

          <div className={`player__controls ${isMuted ? `visually-hidden` : ``}`}>

            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value={`${this.state.progress}`} max="100"></progress>
                <div className="player__toggler" style={divStyle}>Toggler</div>
              </div>
              <div className="player__time-value">{this.state.duration}</div>
            </div>

            <div className="player__controls-row">
              <button type="button" className="player__play"
                onClick={(evt) => {
                  this.onPlayButtonClick(evt);
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
                  onSetFullScreen(evt);
                }}
              >
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
          <video className="player__video" ref={this._videoRef}
            poster={this.props.poster}
            muted={this.state.isMuted}
            width={this.props.width}>
            <source src={this.props.src}/>
          </video>
        </div>
      </React.Fragment>
    );
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }
}

Video.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  poster: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
};

export default Video;
