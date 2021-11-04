import React from 'react';
import Button from '../Button/Button';
import classnames from 'classnames';
import { gameClassMap, raceSexMap } from '../../utils/const';

import './Char.less';

const CharView = ({
  guid,
  level,
  race,
  gameClass,
  name,
  honor,
  arena,
  teleportHandler,
  changeRaceHandler,
  changeFractionHandler,
  changeNickHandler,
  gender,
  guildName,
  className,
  globalConfig,
  setChangeOnLogin,
}) => {
  const {
    fraction_change_enabled,
    name_change_enabled,
    race_change_enabled,
    tavern_teleport_enabled,
  } = globalConfig;
  const classes = classnames({
    Char: true,
    [className]: className && true,
  });
  const raceIndex = raceSexMap[race] !== undefined ? race : 0;
  const gameClassIndex = gameClassMap[gameClass] !== undefined ? gameClass : 0;
  const { icon, color, slug } = gameClassMap[gameClassIndex];
  const iconRace = raceSexMap[raceIndex][gender];
  return (
    <section className={classes}>
      <div className="Char__wrap">
        <div className="Char__id-block">
          <p className="Char__id">{level}</p>
        </div>
        <div className="Char__name-block">
          <img src={iconRace} alt={slug} className="Char__img" />
          <img src={icon} alt={slug} className="Char__img" />
          <div className="Char__name-wrap">
            <p className="Char__name" style={{ color }}>
              {name} <span className="Char__name-mobile-lvl">({level})</span>
            </p>
            {guildName && (
              <p className="Char__guild">
                &#8249;{guildName}
                &#8250;
              </p>
            )}
          </div>
        </div>
        <div className="Char__point-block">
          <p className="Char__point">
            <span className="Char__point-name">Очки арены:</span>
            <span className="Char__point-value">{arena}</span>
          </p>
          <p className="Char__point">
            <span className="Char__point-name">Хонор:</span>
            <span className="Char__point-value">{honor}</span>
          </p>
        </div>

        <div className="Char__action-block">
          <div className="Char__action-line">
            {tavern_teleport_enabled && (
              <Button
                className="Char__action-btn"
                size="small"
                onClick={() => teleportHandler(guid)}
              >
                Телепорт в таверну
              </Button>
            )}
            {race_change_enabled && (
              <Button
                className="Char__action-btn"
                size="small"
                onClick={() => setChangeOnLogin(guid, 'change_race')}
              >
                Сменить рассу
              </Button>
            )}
          </div>
          <div className="Char__action-line">
            {fraction_change_enabled && (
              <Button
                className="Char__action-btn"
                size="small"
                onClick={() => setChangeOnLogin(guid, 'change_fraction')}
              >
                Сменить фракцию
              </Button>
            )}
            {name_change_enabled && (
              <Button
                className="Char__action-btn"
                size="small"
                onClick={() => setChangeOnLogin(guid, 'change_nick')}
              >
                Сменить ник
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { CharView };
