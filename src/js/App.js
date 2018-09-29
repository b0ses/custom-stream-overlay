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
      sound: ''
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('FromAPI', data => this.updateMessage(data.message, data.sound));
  }

  updateMessage(message, sound) {
    this.setState({
      message: message,
      sound: sound
    });
  }

  render() {
    const { sound } = this.state;
    const { message } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
      <p>
        { message }
      </p>
      <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" title='bypass-sound'>
      { sound
      ? (
        <Sound
          url={ sound }
          playStatus={Sound.status.PLAYING}
          volume={100}
          playFromPosition={0 /* in milliseconds */}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      ) : <br />}
      </iframe>
      </div>
    );
  }
}
export default App;
