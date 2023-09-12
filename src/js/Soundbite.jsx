import React, { Component } from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';

class Soundbite extends Component {
  constructor() {
    super();

    this.handleSongPlaying = this.handleSongPlaying.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps !== this.props);
  }

  handleSongPlaying(status) {
    const { cutoff } = this.props;
    if (cutoff > 0 && status.position >= cutoff) {
      status.stop();
    }
  }

  render() {
    const { url, onLoad, play } = this.props;
    return (
      <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" title="bypass-sound">
        { url
          ? (
            <Sound
              url={url}
              autoLoad={true}
              playStatus={play ? Sound.status.PLAYING : Sound.status.STOPPED}
              volume={100}
              playFromPosition={0 /* in milliseconds */}
              onLoad={onLoad}
              onPlaying={this.handleSongPlaying}
            />
          ) : <br />
        }
      </iframe>
    );
  }
}

Soundbite.propTypes = {
  url: PropTypes.string,
  cutoff: PropTypes.number,
  onLoading: PropTypes.func,
  play: PropTypes.bool
};

Soundbite.defaultProps = {
  url: '',
  cutoff: 0,
  onLoading: null,
  play: false,
};

export default Soundbite;
