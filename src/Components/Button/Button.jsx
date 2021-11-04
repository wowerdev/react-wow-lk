import React, { Component } from 'react';
import { ButtonView } from './ButtonView';

class Button extends Component {
  render() {
    return <ButtonView {...this.props} />;
  }
}
export default Button;
