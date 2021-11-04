import { makeObservable, observable, action, computed } from 'mobx';
import { regAccountApi } from '../api/account';

class RegStore {
  constructor() {
    makeObservable(this);
  }

  @observable regInputData = getInitialRegInputData();
  @action setRegInputData = (inputName, value) => {
    const index = this.regInputData.findIndex(({ name }) => name === inputName);
    this.regInputData[index].value = value;
    this.regInputData = [...this.regInputData];
  };
  @computed get isEqualPass() {
    return this.regInputData[1].value === this.regInputData[2].value;
  }
  @computed get inputValue() {
    const obj = {};
    this.regInputData.forEach(({ name, value }) => {
      obj[name] = value;
    });
    return obj;
  }
  regAccount = () => {
    return new Promise((res, rej) => {
      regAccountApi(this.inputValue).then(res).catch(rej);
    });
  };
}

const getInitialRegInputData = () => {
  return [
    {
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      required: true,
      value: '1234',
      min: 4,
      max: 32,
    },
    {
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      required: true,
      type: 'password',
      value: '1234',
      min: 4,
      max: 32,
    },
    {
      name: 'password2',
      label: 'Повторите пароль',
      placeholder: 'Повторите пароль',
      required: true,
      type: 'password',
      value: '1234',
      min: 4,
      max: 32,
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Введите email',
      required: true,
      type: 'email',
      value: 'sss@sse.ey',
      min: 7,
      max: 42,
    },
    {
      name: 'captcha',
      label: `${new Date().getDate()} + три`,
      placeholder: 'Введите капчу',
      required: true,
      type: 'number',
      value: '1',
      min: 1,
      max: 2,
    },
  ];
};

export default new RegStore();
