import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../Components/Title/Title';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

import './Reg.less';

const RegView = ({ data, submitHandler, inputHandler, goBackHandler }) => {
  const inputs = data.map(
    ({ name, label, placeholder, required, value, min, max, type }, i) => {
      return (
        <Input
          key={i}
          label={label}
          placeholder={placeholder}
          className="Reg__input"
          type={type ? type : 'value'}
          required={!!required}
          value={value}
          minLength={min}
          maxLength={max}
          onChange={(e) => inputHandler(name, e.target.value)}
        />
      );
    }
  );
  return (
    <>
      <div className="Reg">
        <div className="Reg__wrap">
          <form
            className="Reg__block"
            onSubmit={(e) => submitHandler(e, inputs)}
          >
            <Title level={1} className="Reg__title">
              Регистрация
            </Title>
            {inputs}
            <Button className="Reg__btn">Зарегистрироваться</Button>
            <hr className="Reg__hr" />
            <Button
              type="button"
              className="Reg__btn"
              view="ghost"
              onClick={goBackHandler}
            >
              Назад
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export { RegView };
