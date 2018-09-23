import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

const kGlobalConstants = require('./Settings').default;

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: `${kGlobalConstants.API_HOST}:${kGlobalConstants.API_PORT}`
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('FromAPI', data => this.updateMessage(data.message));
  }

  updateMessage(message) {
    this.setState({ response: message });
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        {response
          ? (
            <p>
              {response}
            </p>
          )
          : <p />}
      </div>
    );
  }
}
export default App;
