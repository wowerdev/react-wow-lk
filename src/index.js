import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ConfirmModal from './Components/ConfirmModal/ConfirmModal';
import Layout from './Components/Layout/Layout';
import Notice from './Components/Notice/Notice';
import Preloader from './Components/Preloader/Preloader';

import './index.less';

ReactDOM.render(
  <BrowserRouter>
    <Preloader />
    <ConfirmModal />
    <Notice />
    <Layout />
  </BrowserRouter>,
  document.getElementById('root')
);
