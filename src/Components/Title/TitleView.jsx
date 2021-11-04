import React from 'react';
import classnames from 'classnames';

import './Title.less';

const TitleView = ({ children, level, className, noMargin }) => {
  const localLevel =
    typeof level === 'number' && level > 0 && level <= 6 ? level : 2;
  const TitleTag = `h${localLevel}`;

  const classes = classnames({
    'platform-Title': true,
    [className]: className && true,
    'platform-Title--noMargin': noMargin,
  });

  return <TitleTag className={classes}>{children}</TitleTag>;
};

export { TitleView };
