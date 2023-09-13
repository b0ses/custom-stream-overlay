import React, { Component } from 'react';
import io from 'socket.io-client';

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
      sound: '',
      clicked: false,
      soundDuration: null,
      dbDuration: null,
      play: false,
      timeout: null
    };

    this.start = this.start.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad(details){
    this.setState({ soundDuration: details.duration, play: true }, () => {
      this.displayText();
    } );
  }

  displayText() {
    // Play sound and render hidden text with css effect
    // Show text, sound won't repeat
    const { soundDuration, dbDuration, effect } = this.state;
    const fadeDuration = 1000;
    let duration = (dbDuration || soundDuration || 3000);
    if (effect === 'fade' && duration > fadeDuration)
      duration = duration - fadeDuration;

    this.setState({ visibility: 'visible' }, () => {
      // Hide it after [duration] milliseconds
      const timeout = setTimeout(() => {
        this.setState({ visibility: 'hidden' } );
      }, duration);
      this.setState({ timeout });
    });
  }

  start(e) {
    e.preventDefault();
    this.setState({
      clicked: true
    });
    const { endpoint } = this.state;
    const socket = io(endpoint, {
      withCredentials: true
    });
    socket.on('FromAPI', (data) => {
      const { timeout } = this.state;
      if (timeout)
        clearTimeout(timeout);
      this.setState({ text: null, sound: null, dbDuration: 0, effect: data.effect, play: false, visibility: 'hidden', soundDuration: null, timeout: null });
      this.setState({ text: data.text, sound: data.sound, dbDuration: data.duration, effect: data.effect});
      if (!data.sound && data.duration)
        this.displayText();
    });
  }

  render() {
    const { clicked } = this.state;
    const { text } = this.state;
    const { visibility } = this.state;
    const { effect } = this.state;
    const { sound } = this.state;
    const { play } = this.state;

    if (clicked) {
      return (
        <div>
          <Alert text={text} visibility={visibility} effect={effect} />
          <Soundbite url={sound} play={play} onLoad={this.onLoad} cutoff={kGlobalConstants.CUTOFF} />
        </div>
      );
    }
    return (
      <button type="button" onClick={this.start}>
        Click me to start
      </button>
    );
  }
}
export default App;
