import axios from 'axios';
import NoticeStore from '../stores/NoticeStore';
import PreloaderStore from '../stores/PreloaderStore';

const { addNotice } = NoticeStore;
const { setPreloaderState } = PreloaderStore;

// TODO проверить как эти пути будут себя вести на проде (поддомен / директория)
const { protocol, hostname } = window.location;
const baseUrl = `${protocol}//${hostname}/api`;

const baseApi = (data = {}) => {
  const randomPromiseId = Math.random();
  setPreloaderState(true, randomPromiseId);
  return new Promise((res, rej) => {
    axios
      .post(baseUrl, { data })
      .then(({ data }) => {
        if (typeof data !== 'object') {
          throw new Error('Ошибка сервера');
        } else {
          return data;
        }
      })
      .then(({ status, result }) => {
        if (status !== 200) {
          throw new Error(result);
        } else {
          setPreloaderState(false, randomPromiseId);
          res(result);
        }
      })
      .catch(({ message }) => {
        setPreloaderState(false, randomPromiseId);
        addNotice({
          type: 'error',
          content: message,
        });
        rej();
      });
  });
};

export { baseApi };
