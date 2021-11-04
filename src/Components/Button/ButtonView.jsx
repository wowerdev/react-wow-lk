import React from 'react';
import classnames from 'classnames';

import './Button.less';

const ButtonView = ({
  view,
  size,
  disabled,
  onClick,
  children,
  className,
  ...other
}) => {
  const classes = classnames({
    'platform-Button': true,
    [className]: className && true,
    'platform-Button--ghost': view === 'ghost',
    'platform-Button--small': size === 'small',
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...other}
    >
      {children}
    </button>
  );
};

export { ButtonView };
