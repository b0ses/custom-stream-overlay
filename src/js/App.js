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
      play: false
    };

    this.start = this.start.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }


  onLoad(details){
    this.setState({ soundDuration: details.duration } );
    this.displayAlert();
  }

  onFinish(){
    this.setState({ play: false, visibility: 'hidden' } );
  }


  displayAlert() {
    // Play sound and render hidden text with css effect
    // Show text, sound won't repeat
    const { soundDuration, dbDuration } = this.state;
    const duration = soundDuration || dbDuration || 3000;
    this.setState({ visibility: 'visible' }, () => {
      // Hide it after [duration] milliseconds
      const scopedThis = this;
      setTimeout(() => {
        const { play } = this.state;
        if (!play){
          scopedThis.setState({
            visibility: 'hidden'
          });
        }
      }, duration);
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
      this.setState({ text: data.text, sound: data.sound, dbDuration: data.duration, effect: data.effect, play:true, visibility: 'hidden', soundDuration: null});
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
          <Soundbite url={sound} play={play} onLoad={this.onLoad} onFinish={this.onFinish} cutoff={kGlobalConstants.CUTOFF} />
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
