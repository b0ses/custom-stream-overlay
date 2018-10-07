import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Sound from 'react-sound';

const kGlobalConstants = require('./Settings').default;

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: `${kGlobalConstants.API_HOST}:${kGlobalConstants.API_PORT}`,
      message: '',
      classes: 'hidden',
      sound: ''
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('FromAPI', data => this.updateMessage(data.message, data.sound, data.duration, data.effect));
  }

  updateMessage(message, sound, duration, effect) {
    // Load effect before showing
    this.setState({
      classes: effect ? `hidden ${effect}` : 'hidden'
    });
    // Show it
    this.setState({
      message,
      classes: effect ? `visible  ${effect}` : 'visible',
      sound
    });

    // Hide it after [duration] milliseconds
    const scopedThis = this;
    setTimeout(() => {
      scopedThis.setState({
        message,
        classes: effect ? `hidden ${effect}` : 'hidden',
        sound: ''
      });
    }, duration || 3000);
  }

  render() {
    const { message } = this.state;
    const { classes } = this.state;
    const { sound } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        <p id="text" className={classes}>
          { message }
        </p>
        <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" title="bypass-sound">
          { sound
            ? (
              <Sound
                url={sound}
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
      </div>
    );
  }
}
export default App;
