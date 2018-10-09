import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  generateClasses() {
    const { visibility } = this.props;
    const { effect } = this.props;
    const classes = [visibility];
    if (effect) {
      classes.push(effect);
    }
    return classes.join(' ');
  }

  render() {
    const classes = this.generateClasses();
    const { content } = this.props;
    return (
      <p id="text" className={classes} style={{ textAlign: 'center' }}>
        { content }
      </p>
    );
  }
}

Message.propTypes = {
  content: PropTypes.string,
  visibility: PropTypes.string,
  effect: PropTypes.string
};

Message.defaultProps = {
  content: '',
  visibility: 'hidden',
  effect: ''
};

export default Message;
