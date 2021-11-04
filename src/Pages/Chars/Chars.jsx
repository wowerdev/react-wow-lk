import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ConfirmModalStore from '../../stores/ConfirmModalStore';
import { CharsView } from './CharsView';
import CharStore from '../../stores/CharStore';
import NoticeStore from '../../stores/NoticeStore';
import GlobalStore from '../../stores/GlobalStore';

const { addNotice } = NoticeStore;
const { openModal, closeModal } = ConfirmModalStore;
const { initAllChars, tavernTeleport, setChangeOnLogin } = CharStore;

@observer
class Chars extends Component {
  componentDidMount() {
    document.title = 'WoW ЛК: Персонажи';
    initAllChars();
  }

  _teleportHandler = (guid) => {
    const { globalConfig } = GlobalStore;
    const data = { guid };
    openModal({
      titleText: 'Подтвердите действие',
      actionText: 'Телепортировать в таверну',
      descText: `Цена ${globalConfig.tavern_teleport_cost} бонусов`,
      okHandler: () =>
        tavernTeleport(data)
          .then((result) => addNotice({ type: 'ok', content: result }))
          .finally(closeModal),
    });
  };

  _setChangeOnLogin = (guid, serviceName) => {
    const { globalConfig } = GlobalStore;
    const { fraction_change_cost, race_change_cost, name_change_cost } =
      globalConfig;
    const actionMap = {
      change_nick: 'Сменить ник',
      change_race: 'Сменить рассу',
      change_fraction: 'Сменить фракцию',
    };
    const priceMap = {
      change_nick: name_change_cost,
      change_race: race_change_cost,
      change_fraction: fraction_change_cost,
    };
    openModal({
      titleText: 'Подтвердите действие',
      actionText: actionMap[serviceName],
      descText: `Цена ${priceMap[serviceName]} бонусов`,
      okHandler: () =>
        setChangeOnLogin(guid, serviceName)
          .then((result) => addNotice({ type: 'ok', content: result }))
          .finally(closeModal),
    });
  };

  render() {
    const { globalConfig } = GlobalStore;
    const { allChars } = CharStore;
    const hasData = allChars.length && Object.keys(globalConfig).length;
    return hasData ? (
      <CharsView
        allChars={allChars}
        teleportHandler={this._teleportHandler}
        globalConfig={globalConfig}
        setChangeOnLogin={this._setChangeOnLogin}
      />
    ) : null;
  }
}
export default Chars;
