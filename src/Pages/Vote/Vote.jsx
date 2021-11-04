import { observer } from 'mobx-react';
import React, { Component } from 'react';
import GlobalStore from '../../stores/GlobalStore';
import { VoteView } from './VoteView';

@observer
class Vote extends Component {
  componentDidMount() {
    document.title = 'WoW ЛК: Голосование';
  }
  render() {
    const { globalConfig } = GlobalStore;
    return <VoteView globalConfig={globalConfig} />;
  }
}
export default Vote;
