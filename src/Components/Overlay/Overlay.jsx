import React from 'react';

import './Overlay.less';

const Overlay = ({ children }) => {
  const allOverlays = document.querySelectorAll('.Overlay');
  const baseOverlayZIndex = 10;
  let zIndex = baseOverlayZIndex;
  if (allOverlays.length) {
    const lastChildOverlay = allOverlays[allOverlays.length - 1];
    zIndex = +getComputedStyle(lastChildOverlay).zIndex + 1;
  }
  return (
    <div className="Overlay" style={{ zIndex }}>
      {children}
    </div>
  );
};

export default Overlay;
