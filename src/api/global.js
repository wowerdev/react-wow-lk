import { baseApi } from './base';

const object = 'global';

const getGlobalConfigApi = () => {
  return baseApi({ object, method: 'getGlobalConfig' });
};

export { getGlobalConfigApi };
