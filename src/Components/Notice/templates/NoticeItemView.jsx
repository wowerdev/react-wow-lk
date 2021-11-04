import React from 'react';
import classnames from 'classnames';
import closeIcon from '../../../assets/img/close.png';

const NoticeItemView = ({ id, type, content, closeHandler }) => {
  const classes = classnames({
    Notice__item: true,
    'Notice__item--error': type === 'error',
    'Notice__item--success': type === 'ok',
  });
  return content ? (
    <div className={classes}>
      <div className="Notice__close-block" onClick={() => closeHandler(id)}>
        <img src={closeIcon} alt="close" className="Notice__close" />
      </div>
      <span className="Notice__content">{content}</span>
    </div>
  ) : null;
};

export { NoticeItemView };
