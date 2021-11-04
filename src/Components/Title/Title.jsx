import React, { Component } from 'react';
import { TitleView } from './TitleView';

class Title extends Component {
  render() {
    return <TitleView {...this.props} />;
  }
}
export default Title;
