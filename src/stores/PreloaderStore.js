import { makeObservable, observable, action } from 'mobx';

class PreloaderStore {
  constructor() {
    makeObservable(this);
  }

  @observable preloaderState = false;
  preloaderQueue = new Set();

  /**
   * Метод отображает прелоадер.
   * Если передать второй аргумент, будет дожидаться выполнения всех загрузок
   * @param {Boolean} state true - прелодаер включен
   * @param {Number} [id] Номер прелодаера
   */
  @action setPreloaderState = (state, id) => {
    if (id) {
      if (state) {
        this.preloaderQueue.add(id);
        this.preloaderState = true;
      } else {
        this.preloaderQueue.delete(id);
        if (!this.preloaderQueue.size) {
          this.preloaderState = false;
        }
      }
    }
  };
}

export default new PreloaderStore();
