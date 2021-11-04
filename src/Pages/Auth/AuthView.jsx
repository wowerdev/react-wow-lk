import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../Components/Title/Title';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

import './Auth.less';

const AuthView = ({ submitHandler }) => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <>
      <div className="Auth">
        <div className="Auth__wrap">
          <form
            className="Auth__block"
            onSubmit={(e) => submitHandler(e, loginInput, passwordInput)}
          >
            <Title level={1} className="Auth__title">
              Авторизация
            </Title>
            <Input
              label="Логин"
              placeholder="Введите логин"
              className="Auth__input"
              required
              onInput={(e) => setLoginInput(e.target.value)}
            />
            <Input
              label="Пароль"
              placeholder="Введите пароль"
              className="Auth__input"
              type="password"
              required
              onInput={(e) => setPasswordInput(e.target.value)}
            />
            <Button className="Auth__btn">Войти</Button>
            <hr className="Auth__hr" />
            <Button className="Auth__btn" type="button">
              <Link to="/reg" className="Auth__link">
                Регистрация
              </Link>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export { AuthView };
