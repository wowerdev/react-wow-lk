import { makeObservable, observable, action } from 'mobx';
import {
  getCharsApi,
  setChangeOnLoginApi,
  tavernTeleportApi,
} from '../api/char';
import AccountStore from './AccountStore';

const { initAccountData } = AccountStore;

class CharStore {
  constructor() {
    makeObservable(this);
  }

  @observable allChars = [];

  @action setAllChars = (data) => {
    this.allChars = [...data];
  };

  /**
   * Метод загружает и устанавливает данные аккаунта
   * Кеширует результат
   */
  initAllChars = () => {
    return new Promise((res, rej) => {
      if (Object.keys(this.allChars).length) {
        return;
      }
      getCharsApi()
        .then((result) => {
          this.setAllChars(result);
          res();
        })
        .catch(() => {
          this.setAllChars([]);
          rej();
        });
    });
  };

  /**
   * Метод обработчик телепорта в таверну
   */
  tavernTeleport = (data) => {
    return new Promise((res, rej) => {
      tavernTeleportApi(data)
        .then((result) => result)
        .then((result) => initAccountData(true).then(() => res(result)))
        .catch(() => rej('Не удалось телепортировать персонажа'));
    });
  };

  /**
   * Метод выполняет действия при логине: смена расы \ ника \ фракции
   * @param {String} guid
   * @param {'change_nick' | 'change_race' | 'change_fraction'} serviceName
   */
  setChangeOnLogin = (guid, serviceName) => {
    return new Promise((res, rej) => {
      setChangeOnLoginApi({ guid, serviceName })
        .then((result) => result)
        .then((result) => initAccountData(true).then(() => res(result)))
        .catch(() => rej('Не удалось выполнить действие'));
    });
  };
}

export default new CharStore();
