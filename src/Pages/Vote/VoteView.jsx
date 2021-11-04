import React from 'react';
import Title from '../../Components/Title/Title';
import VoteItem from '../../Components/VoteItem/VoteItem';

import './Vote.less';

const VoteView = ({ globalConfig }) => {
  const { vote_bonus_count } = globalConfig;

  return (
    <div className="Vote">
      <Title className="platform-Title--page">Голосование</Title>
      <VoteItem name="mmotop" bonusCount={vote_bonus_count} />
    </div>
  );
};

export { VoteView };
