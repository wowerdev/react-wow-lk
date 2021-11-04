import { baseApi } from './base';

const object = 'char';

const getCharsApi = () => {
  return baseApi({ object, method: 'getChars' });
};

const tavernTeleportApi = (data) => {
  return baseApi({ object, method: 'tavernTeleport', data });
};

const setChangeOnLoginApi = (data) => {
  return baseApi({ object, method: 'setChangeOnLogin', data });
};

export { getCharsApi, tavernTeleportApi, setChangeOnLoginApi };
