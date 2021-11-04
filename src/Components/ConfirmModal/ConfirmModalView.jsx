import React from 'react';
import Overlay from '../Overlay/Overlay';
import Button from '../Button/Button';

import './ConfirmModal.less';

const ConfirmModalView = ({
  state,
  titleText,
  actionText,
  descText,
  okHandler,
  closeHandler,
}) => {
  if (!state) return null;
  return (
    <Overlay>
      <div className="ConfirmModal">
        <div className="ConfirmModal__wrap">
          <div className="ConfirmModal__text-block">
            <p className="ConfirmModal__title">{titleText}</p>
            <p className="ConfirmModal__action">{actionText}</p>
            <p className="ConfirmModal__desc">{descText}</p>
          </div>
          <div className="ConfirmModal__actions-block">
            <Button
              className="ConfirmModal__actions-btn"
              size="small"
              onClick={okHandler ? okHandler : closeHandler}
            >
              Подтвердить
            </Button>
            <Button
              className="ConfirmModal__actions-btn"
              size="small"
              onClick={closeHandler}
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export { ConfirmModalView };
