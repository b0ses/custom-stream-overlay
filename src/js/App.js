import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import Soundbite from './Soundbite';
import Message from './Message';

const kGlobalConstants = require('./Settings').default;

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: `${kGlobalConstants.API_HOST}:${kGlobalConstants.API_PORT}`,
      message: '',
      visibility: 'hidden',
      effect: '',
      sound: ''
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('FromAPI', data => this.displayMessage(data.message, data.sound, data.duration, data.effect));
  }

  displayMessage(message, sound, duration, effect) {
    // Play sound and render hidden message with css effect
    this.setState({ sound, effect }, () => {
      // Show message, sound won't repeat
      this.setState({ message, visibility: 'visible', sound: '' }, () => {
        // Hide it after [duration] milliseconds
        const scopedThis = this;
        setTimeout(() => {
          scopedThis.setState({
            visibility: 'hidden'
          });
        }, duration || 3000);
      });
    });
  }

  render() {
    const { message } = this.state;
    const { visibility } = this.state;
    const { effect } = this.state;
    const { sound } = this.state;
    return (
      <div>
        <Message content={message} visibility={visibility} effect={effect} />
        <Soundbite url={sound} />
      </div>
    );
  }
}
export default App;
