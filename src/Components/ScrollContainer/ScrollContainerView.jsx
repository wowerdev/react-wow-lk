import React from 'react';

import './ScrollContainer.less';

const ScrollContainerView = ({ children, myref, calcHeight }) => {
  return (
    <div className="ScrollContainer" ref={myref} style={{ height: calcHeight }}>
      {children}
    </div>
  );
};

export { ScrollContainerView };
