import React, { Component } from 'react';
import { AuthView } from './AuthView';
import AuthStore from '../../stores/AuthStore';
import { observer } from 'mobx-react';

const { setAuth } = AuthStore;

const submitHandler = (e, login, password) => {
  e.preventDefault();
  setAuth({ login, password });
};

@observer
class Auth extends Component {
  componentDidMount() {
    document.title = 'WoW ЛК: Авторизация';
  }

  render() {
    return <AuthView submitHandler={submitHandler} />;
  }
}
export default Auth;
