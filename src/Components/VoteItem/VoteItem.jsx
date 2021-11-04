import { observer } from 'mobx-react';
import React, { Component } from 'react';
import GlobalStore from '../../stores/GlobalStore';
import { VoteItemView } from './VoteItemView';

@observer
class VoteItem extends Component {
  _voteHandler = () => {
    const { globalConfig } = GlobalStore;
    window.open(globalConfig.vote_mmotop_url);
  };
  render() {
    return <VoteItemView {...this.props} voteHandler={this._voteHandler} />;
  }
}
export default VoteItem;
