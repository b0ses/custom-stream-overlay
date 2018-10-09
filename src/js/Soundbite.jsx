import React, { Component } from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';

class Soundbite extends Component {
  shouldComponentUpdate(nextProps) {
    return (nextProps.url !== '');
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
  url: PropTypes.string
};

Soundbite.defaultProps = {
  url: ''
};

export default Soundbite;
