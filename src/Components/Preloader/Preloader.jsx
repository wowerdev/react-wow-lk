import React, { Component } from 'react';
import { PreloaderView } from './PreloaderView';
import { observer } from 'mobx-react';
import PreloaderStore from '../../stores/PreloaderStore';

@observer
class Preloader extends Component {
  render() {
    const { preloaderState } = PreloaderStore;
    return <PreloaderView state={preloaderState} />;
  }
}
export default Preloader;
