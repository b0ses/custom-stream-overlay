import React, { Component } from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';

class Soundbite extends Component {
  constructor() {
    super();

    this.handleSongPlaying = this.handleSongPlaying.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.url !== '');
  }

  handleSongPlaying(status) {
    const { cutoff } = this.props;
    if (cutoff > 0 && status.position >= cutoff) {
      status.stop();
    }
  }

  render() {
    const { url } = this.props;
    return (
      <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" title="bypass-sound">
        { url
          ? (
            <Sound
              url={url}
              playStatus={Sound.status.PLAYING}
              volume={100}
              playFromPosition={0 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
            />
          ) : <br />
        }
      </iframe>
    );
  }
}

Soundbite.propTypes = {
  url: PropTypes.string,
  cutoff: PropTypes.number
};

Soundbite.defaultProps = {
  url: '',
  cutoff: 0
};

export default Soundbite;
