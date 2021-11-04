import React from 'react';
import Char from '../../Components/Char/Char';
import Title from '../../Components/Title/Title';
import ScrollContainer from '../../Components/ScrollContainer/ScrollContainer';

import './Chars.less';

const CharsView = ({
  allChars,
  teleportHandler,
  globalConfig,
  setChangeOnLogin,
}) => {
  const chars = allChars.map(
    ({
      guid,
      level,
      race,
      name,
      totalHonorPoints,
      arenaPoints,
      gameClass,
      gender,
      guildName,
    }) => {
      return (
        <Char
          key={guid}
          guid={guid}
          level={level}
          gameClass={gameClass}
          race={race}
          name={name}
          honor={totalHonorPoints}
          arena={arenaPoints}
          gender={gender}
          guildName={guildName}
          teleportHandler={teleportHandler}
          globalConfig={globalConfig}
          setChangeOnLogin={setChangeOnLogin}
          className="Chars__char"
        />
      );
    }
  );

  return (
    <div className="Chars">
      <Title className="platform-Title--page">Информация о персонажах</Title>
      <ScrollContainer>{chars}</ScrollContainer>
    </div>
  );
};

export { CharsView };
