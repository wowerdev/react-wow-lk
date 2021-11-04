import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ConfirmModalView } from './ConfirmModalView';
import ConfirmModalStore from '../../stores/ConfirmModalStore';

const { closeModal } = ConfirmModalStore;

@observer
class ConfirmModal extends Component {
  render() {
    const { modalProps } = ConfirmModalStore;
    const { okHandler } = modalProps;
    return (
      <ConfirmModalView
        closeHandler={closeModal}
        okHandler={okHandler}
        {...modalProps}
      />
    );
  }
}
export default ConfirmModal;
