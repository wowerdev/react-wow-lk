import React from 'react';
import Button from '../../Components/Button/Button';

import './VoteItem.less';

const VoteItemView = ({ name, bonusCount, voteHandler }) => {
  return (
    <section className="VoteItem">
      <div className="VoteItem__wrap">
        <div className="VoteItem__name-block">
          <p className="VoteItem__name">{name}</p>
        </div>
        <div className="VoteItem__point-block">
          <p className="VoteItem__point">
            <span className="VoteItem__point-name">1 голос =</span>
            <span className="VoteItem__point-value">{bonusCount}</span>
            <span className="VoteItem__point-postfix">бон.</span>
          </p>
        </div>
        <div className="VoteItem__action-block">
          <div className="VoteItem__action-line">
            <Button
              className="VoteItem__action-btn"
              size="small"
              onClick={() => voteHandler()}
            >
              Проголосовать
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { VoteItemView };
