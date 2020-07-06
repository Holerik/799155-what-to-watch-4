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

const withVideo = (Component) => {
  class WithVideo extends React.PureComponent {
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
      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
      this._onExitButtonClick = this._onExitButtonClick.bind(this);
    }

    _muteHandler() {
      this.setState((prevState) => (this.setState({isMuted: !prevState.isMuted})));
      const video = this._videoRef.current;
      video.muted = this.state.isMuted;
    }

    _onPlayButtonClick(evt) {
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

    _onExitButtonClick(evt) {
      evt.preventDefault();
      if (this.state.isPlaying) {
        this.setState({isPlaying: false});
        const video = this._videoRef.current;
        video.playbackRate = 0;
      }
      this.props.onStopPlayMovie();
    }

    componentDidMount() {
      const video = this._videoRef.current;
      video.src = this.props.src;
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

    componentDidUpdate() {
      const video = this._videoRef.current;
      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          fullScreenButtonHandler={onSetFullScreen}
          playButtonClickHandler={this._onPlayButtonClick}
          exitButtonClickHandler={this._onExitButtonClick}
        >
          <video className="player__video" ref={this._videoRef}
            poster={this.props.poster}
            muted={this.state.isMuted}
            width={this.props.width}>
            <source src={this.props.src}/>
          </video>
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onStopPlayMovie: PropTypes.func,
    poster: PropTypes.string.isRequired,
    isMuted: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
  };
  return WithVideo;
};

export default withVideo;
