import { baseApi } from './base';

const object = 'auth';

const isAuthApi = () => {
  return baseApi({ object, method: 'isAuth' });
};

const setAuthApi = (data) => {
  return baseApi({ object, method: 'setAuth', data });
};

const logOutApi = () => {
  return baseApi({ object, method: 'logOut' });
};
export { isAuthApi, setAuthApi, logOutApi };
