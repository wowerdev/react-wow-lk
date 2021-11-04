import { observer } from 'mobx-react';
import React, { Component } from 'react';
import NoticeStore from '../../stores/NoticeStore';
import RegStore from '../../stores/RegStore';
import { RegView } from './RegView';

const { addNotice } = NoticeStore;
const { setRegInputData, regAccount } = RegStore;

@observer
class Reg extends Component {
  componentDidMount() {
    document.title = 'WoW ЛК: Регистрация';
  }
  _submitHandler = (e) => {
    const { isEqualPass } = RegStore;
    e.preventDefault();
    if (isEqualPass) {
      regAccount().then((result) => {
        addNotice({ type: 'ok', content: result });
      });
    } else {
      addNotice({ type: 'error', content: 'Пароли не совпадают' });
    }
  };

  _inputHandler = (inputName, value) => {
    setRegInputData(inputName, value);
  };

  render() {
    const { regInputData } = RegStore;
    return (
      <RegView
        submitHandler={this._submitHandler}
        inputHandler={this._inputHandler}
        data={regInputData}
        goBackHandler={this.props.history.goBack}
      />
    );
  }
}
export default Reg;
