import React, { Component } from 'react';
import { CharView } from './CharView';

class Char extends Component {
  render() {
    return <CharView {...this.props} />;
  }
}
export default Char;
