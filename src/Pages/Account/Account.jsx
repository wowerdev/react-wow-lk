import { observer } from 'mobx-react';
import React, { Component } from 'react';
import AccountStore from '../../stores/AccountStore';
import { AccountView } from './AccountView';

const { initAccountData } = AccountStore;

@observer
class Account extends Component {
  componentDidMount() {
    document.title = 'WoW ЛК: Аккаунт';
    initAccountData();
  }

  render() {
    const { accountData } = AccountStore;
    const hasData = Object.keys(accountData).length;
    return hasData ? <AccountView accountData={accountData} /> : null;
  }
}
export default Account;
