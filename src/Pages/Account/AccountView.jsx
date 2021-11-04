import React from 'react';
import Title from '../../Components/Title/Title';

import './Account.less';

const AccountView = ({ accountData }) => {
  const {
    bonuses,
    email,
    joindate,
    last_ip,
    last_login,
    online_status,
    username,
  } = accountData;
  return (
    <div className="Account">
      <Title className="platform-Title--page">Информация о аккаунте</Title>
      <ul className="Account__list">
        <li className="Account__item">
          <p className="Account__text">
            <span className="Account__name">Имя аккаунта:</span>
            <span className="Account__value">{username}</span>
          </p>
        </li>
        <li className="Account__item">
          <p className="Account__text">
            <span className="Account__name">Email:</span>
            <span className="Account__value">{email}</span>
          </p>
        </li>
        <li className="Account__item">
          <p className="Account__text">
            <span className="Account__name">Регистрация:</span>
            <span className="Account__value">{joindate}</span>
          </p>
        </li>
        <li className="Account__item">
          <p className="Account__text">
            <span className="Account__name">Заходил:</span>
            <span className="Account__value">
              {last_login ? last_login : 'Не был в игре'}
            </span>
          </p>
        </li>
        <li className="Account__item">
          <p className="Account__text">
            <span className="Account__name">Последний IP:</span>
            <span className="Account__value">{last_ip}</span>
          </p>
        </li>
        <li className="Account__item">
          <p className="Account__text">
            <span className="Account__name">Статус:</span>
            <span className="Account__value">{online_status}</span>
          </p>
        </li>
        <li className="Account__item">
          <p className="Account__text">
            <span className="Account__name">Баланс:</span>
            <span className="Account__value">{bonuses} бон.</span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export { AccountView };
