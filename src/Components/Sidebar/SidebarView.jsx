import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import Title from '../Title/Title';
import logo from '../../assets/img/race.png';

import './Sidebar.less';

const SidebarView = ({ routes, logOutHandler, serverName }) => {
  const links = routes.map(({ name, path, notLink }) => {
    if (notLink) return null;
    return (
      <li className="Sidebar__item" key={path}>
        <Button>
          <NavLink
            to={path}
            className="Sidebar__link"
            activeClassName="active"
            exact={true}
          >
            {name}
          </NavLink>
        </Button>
      </li>
    );
  });
  return (
    <aside className="Sidebar">
      <Title level={2}>{serverName}</Title>
      <ul className="Sidebar__list">
        {links}
        <li className="Sidebar__item">
          <Button view="ghost" onClick={logOutHandler}>
            Выйти
          </Button>
        </li>
      </ul>
      <div className="Sidebar__img-block">
        <img src={logo} alt="Личный кабинет WoW" className="Sidebar__img" />
      </div>
    </aside>
  );
};

export { SidebarView };
