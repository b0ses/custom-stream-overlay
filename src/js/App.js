import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import Soundbite from './Soundbite';
import Alert from './Alert';

const kGlobalConstants = require('./Settings').default;

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: `${kGlobalConstants.API_HOST}:${kGlobalConstants.API_PORT}`,
      text: '',
      visibility: 'hidden',
      effect: '',
      sound: ''
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('FromAPI', data => this.displayAlert(data.text, data.sound, data.duration, data.effect));
  }

  displayAlert(text, sound, duration, effect) {
    // Play sound and render hidden text with css effect
    this.setState({ sound, effect }, () => {
      // Show text, sound won't repeat
      this.setState({ text, visibility: 'visible', sound: '' }, () => {
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
    const { text } = this.state;
    const { visibility } = this.state;
    const { effect } = this.state;
    const { sound } = this.state;
    return (
      <div>
        <Alert text={text} visibility={visibility} effect={effect} />
        <Soundbite url={sound} />
      </div>
    );
  }
}
export default App;
