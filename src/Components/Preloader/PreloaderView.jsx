import React from 'react';
import Overlay from '../Overlay/Overlay';
import img from '../../assets/img/race.png';

import './Preloader.less';

const PreloaderView = ({ state }) => {
  if (!state) return null;
  return (
    <>
      <Overlay>
        <div className="Preloader">
          <img src={img} alt="icon" className="Preloader__img" />
          <p className="Preloader__text">Загрузка...</p>
        </div>
      </Overlay>
    </>
  );
};

export { PreloaderView };
