import React, { Component } from 'react';
import { InputView } from './InputView';

class Input extends Component {
  render() {
    return <InputView {...this.props} />;
  }
}
export default Input;
