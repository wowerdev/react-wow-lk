import { makeObservable, observable, action } from 'mobx';
import { isAuthApi, setAuthApi, logOutApi } from '../api/auth';

class AuthStore {
  constructor() {
    makeObservable(this);
  }

  @observable isAuth = false;

  @action setAuthState = (state) => {
    this.isAuth = state;
  };

  /**
   * Метод проверяет авторизован ли пользователь и устанавливает состояние
   */
  initAuthState = () => {
    return new Promise((res, rej) => {
      isAuthApi()
        .then((result) => {
          this.setAuthState(result);
          res();
        })
        .catch(rej);
    });
  };

  /**
   * Метод атворизации на сервере.
   * При успешной авторизации устанавливает состояние
   * @param { {login: string, password: string} } data
   */
  setAuth = (data) => {
    return new Promise((res, rej) => {
      setAuthApi(data)
        .then((result) => {
          this.setAuthState(result);
          res();
        })
        .catch(rej);
    });
  };

  /**
   * Метод удаляет авторизацию
   */
  logOut = () => {
    return new Promise((res, rej) => {
      logOutApi()
        .then(() => {
          this.setAuthState(false);
          res();
        })
        .catch(rej);
    });
  };
}

export default new AuthStore();
