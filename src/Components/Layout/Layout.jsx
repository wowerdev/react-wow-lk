import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { LayoutView } from './LayoutView';
import { noSidebarPages } from '../../utils/const';
import AuthStore from '../../stores/AuthStore';

const { initAuthState } = AuthStore;

@observer
class Layout extends Component {
  componentDidMount() {
    initAuthState();
  }

  render() {
    const { isAuth } = AuthStore;
    const { pathname } = this.props.location;
    const hasSidebar = !noSidebarPages.includes(pathname);
    return (
      <LayoutView hasSidebar={hasSidebar} pathname={pathname} isAuth={isAuth} />
    );
  }
}
export default withRouter(Layout);
