import React, { Component } from 'react';
import { io } from 'socket.io-client';

import Alert from './Alert';

const kGlobalConstants = require('./Settings').default;

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: `${kGlobalConstants.API_HOST}:${kGlobalConstants.API_PORT}`,
      alertText: '',
      visibility: 'hidden',
      effect: '',
      clicked: false,
      audioElement: new Audio()
    };

    this.start = this.start.bind(this);
    this.alert = this.alert.bind(this);
  }

  displayText(alertText, soundDuration, effect) {
    // Play sound and render hidden text with css effect
    // Show text, sound won't repeat
    const fadeDuration = 1000;
    let duration = soundDuration;
    if (effect === 'fade' && soundDuration > fadeDuration){
      duration = soundDuration - fadeDuration;
    }

    this.setState({ alertText, visibility: 'visible', effect }, () => {
      // Hide it after [duration] milliseconds
      const timeout = setTimeout(() => {
        this.setState({ visibility: 'hidden' } );
      }, duration);
    });
  }

  alert(data) {
      const { audioElement, timeout } = this.state;
      audioElement.pause();
      
      if (timeout){
        clearTimeout(timeout);
      }

      const newAudioElement = new Audio(data.sound);
      this.setState({ alertText: '', fade: '', effect: '', audioElement: newAudioElement } );
      newAudioElement.addEventListener('loadeddata', () => {
        this.displayText(data.text, newAudioElement.duration*1000, data.effect);
        newAudioElement.play();
     }, false);
  }

  start() {
    this.setState({
      clicked: true
    });
    const { endpoint } = this.state;
    const socket = io(`${endpoint}/${kGlobalConstants.NAMESPACE}`, {
      withCredentials: true
    });
    socket.on('FromAPI', (data) => {
      this.alert(data);
    });
  }

  render() {
    const { clicked } = this.state;
    const { alertText } = this.state;
    const { visibility } = this.state;
    const { effect } = this.state;
    
    if (clicked) {
      return (
        <div>
          <Alert text={alertText} visibility={visibility} effect={effect} />
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
