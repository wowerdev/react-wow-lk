import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import Sidebar from '../Sidebar/Sidebar';
import burgerIcon from '../../assets/img/icon/burger.svg';
import closeIcon from '../../assets/img/icon/close.svg';
import Title from '../Title/Title';
import GlobalStore from '../../stores/GlobalStore';

import './Layout.less';

const { initGlobalConfig, initActiveRoutes } = GlobalStore;

const LayoutView = observer(({ hasSidebar, pathname, isAuth }) => {
  const [loaded, setLoaded] = useState(false);
  const [menuState, setMenuState] = useState(false);

  useEffect(() => {
    initGlobalConfig().then(() => {
      initActiveRoutes();
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return null;
  }

  const { globalConfig, activeRoutes } = GlobalStore;
  const { server_name } = globalConfig;

  //TODO проверить роутинги. Теперь нельзя перейти по прямому урлу, всегда редиректит из-за isAuth
  const routes = activeRoutes.map(({ name, path, exact, component }) => {
    // Если пользователь не авторизован, не на стр. регистрации / авторизации, то редиректим на авторизацию.
    if (pathname !== '/auth' && pathname !== '/reg' && !isAuth) {
      return <Redirect key={path} to="/auth" />;
    } else if (isAuth && pathname === '/auth') {
      // Если пользователь атворизован и на странице авторизации, редиректим его на главную
      return <Redirect key={path} to="/" />;
    }

    return (
      <Route key={name} path={path} exact={exact} component={component()} />
    );
  });

  return (
    <>
      <main className="Layout">
        {hasSidebar && <Sidebar />}
        <section className="Layout__content">
          <nav className="Layout__nav">
            <div className="Layout__burger" onClick={() => setMenuState(true)}>
              <img src={burgerIcon} className="Layout__burger-icon" />
            </div>

            <div className="Layout__mobile-server">
              <Title noMargin={true}>{server_name}</Title>
            </div>

            {menuState && (
              <div className="Layout__menu">
                <div
                  className="Layout__menu-close"
                  onClick={() => setMenuState(false)}
                >
                  <img src={closeIcon} className="Layout__menu-close-icon" />
                </div>
                <div className="Layout__menu-content">
                  <div className="Layout__menu-list">
                    {activeRoutes.map(({ name, path, notLink }) => {
                      return !notLink ? (
                        <NavLink
                          to={path}
                          className="Layout__menu-item"
                          onClick={() => setMenuState(false)}
                          exact={true}
                        >
                          {name}
                        </NavLink>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            )}
          </nav>
          <Switch>{routes}</Switch>
        </section>
      </main>
    </>
  );
});

export { LayoutView };
