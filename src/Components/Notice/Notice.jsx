import React, { Component } from 'react';
import { observer } from 'mobx-react';
import NoticeStore from '../../stores/NoticeStore';
import { NoticeView } from './NoticeView';

const { deleteNotice } = NoticeStore;

@observer
class Notice extends Component {
  render() {
    const { allNotices } = NoticeStore;
    return <NoticeView closeHandler={deleteNotice} allNotices={allNotices} />;
  }
}
export default Notice;
