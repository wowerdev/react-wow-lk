import { baseApi } from './base';

const object = 'account';

const getInfoApi = () => {
  return baseApi({ object, method: 'getInfo' });
};

const regAccountApi = (data) => {
  return baseApi({ object, method: 'regAccount', data });
};

const sendMailApi = (data) => {
  return baseApi({ object, method: 'sendMail', data });
};

export { getInfoApi, regAccountApi, sendMailApi };
