import Reg from '../Pages/Reg/Reg';
import Account from '../Pages/Account/Account';
import Chars from '../Pages/Chars/Chars';
import Feedback from '../Pages/Feedback/Feedback';
import Vote from '../Pages/Vote/Vote';
import Auth from '../Pages/Auth/Auth';

const routes = [
  {
    id: 'account',
    name: 'Аккаунт',
    path: '/',
    exact: true,
    component: () => Account,
  },
  {
    id: 'chars',
    name: 'Персонажи',
    path: '/chars',
    component: () => Chars,
  },
  {
    id: 'feedback',
    name: 'Обратная связь',
    path: '/feedback',
    component: () => Feedback,
  },
  {
    id: 'vote',
    name: 'Голосование',
    path: '/vote',
    component: () => Vote,
  },

  //TODO раскомментировать notLink
  {
    id: 'reg',
    name: 'Регистрация',
    path: '/reg',
    component: () => Reg,
    notLink: true,
  },
  {
    id: 'auth',
    name: 'Авторизация',
    path: '/auth',
    component: () => Auth,
    notLink: true,
  },
];

export { routes };
