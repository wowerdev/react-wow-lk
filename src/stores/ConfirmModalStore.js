import { makeObservable, observable, action } from 'mobx';

class ConfirmModalStore {
  constructor() {
    makeObservable(this);
  }

  @observable modalProps = { ...defaultModalProps };

  @action openModal = (modalProps) => {
    this.modalProps = { ...modalProps, state: true };
  };

  @action closeModal = () => {
    this._setDefaultModalProps();
  };

  _setDefaultModalProps = () => {
    this.modalProps = { ...defaultModalProps };
  };
}

const defaultModalProps = {
  state: false,
  titleText: '',
  actionText: '',
  descText: '',
  okHandler: () => {},
};

export default new ConfirmModalStore();
