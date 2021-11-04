import { makeObservable, observable, action } from 'mobx';
import { getInfoApi } from '../api/account';

class AccountStore {
  constructor() {
    makeObservable(this);
  }

  @observable accountData = {};

  @action setAccountData = (data) => {
    this.accountData = { ...data };
  };

  /**
   * Метод загружает и устанавливает данные аккаунта
   * Кеширует результат
   * @param {Boolean} [needRefresh=false] нужно ли перезагружать кешированные данные
   */
  initAccountData = (needRefresh = false) => {
    return new Promise((res, rej) => {
      if (Object.keys(this.accountData).length && !needRefresh) {
        return;
      }
      getInfoApi()
        .then((result) => {
          this.setAccountData(result);
          res();
        })
        .catch(() => {
          this.setAccountData({});
          rej();
        });
    });
  };
}

export default new AccountStore();
