import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
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
    const { text } = this.props;
    return (
      <p id="text" className={classes} style={{ textAlign: 'center' }}>
        { text }
      </p>
    );
  }
}

Alert.propTypes = {
  text: PropTypes.string,
  visibility: PropTypes.string,
  effect: PropTypes.string
};

Alert.defaultProps = {
  text: '',
  visibility: 'hidden',
  effect: ''
};

export default Alert;
