import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { SidebarView } from './SidebarView';
import { routes } from '../../stores/Routes';
import AuthStore from '../../stores/AuthStore';
import { getRoutesWithoutName } from '../../utils/helper';
import GlobalStore from '../../stores/GlobalStore';

const { logOut } = AuthStore;

@observer
class Sidebar extends Component {
  render() {
    const { globalConfig } = GlobalStore;
    const { vote_enable, server_name } = globalConfig;
    let filterRoutes = getRoutesWithoutName(routes, 'Голосование', vote_enable);

    return (
      <SidebarView
        routes={filterRoutes}
        logOutHandler={logOut}
        serverName={server_name}
      />
    );
  }
}
export default Sidebar;
