import { makeAutoObservable } from 'mobx';
import { getGlobalConfigApi } from '../api/global';
import { routes } from './Routes';

class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Глобальные настройки
   */
  globalConfig = null;

  /**
   * Активные маршруты (с учётом конфига)
   */
  activeRoutes = [];

  setGlobalConfig = (config) => {
    this.globalConfig = config;
  };

  setActiveRoutes = (routes) => {
    this.activeRoutes = routes;
  };

  initGlobalConfig = async () => {
    if (this.globalConfig) return;
    const data = await getGlobalConfigApi();
    this.setGlobalConfig(data);
  };

  initActiveRoutes = () => {
    if (this.activeRoutes.length || !this.globalConfig) return;
    const { vote_enable } = this.globalConfig;
    const map = {
      vote: vote_enable,
    };
    // Возращаем если в мапе нет такого ключа или этот ключ в false
    const filterRoutes = routes.filter(({ id }) => !(id in map) || map[id]);
    this.setActiveRoutes(filterRoutes);
  };
}

export default new GlobalStore();
