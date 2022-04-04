
/* eslint-disable */

//libs
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';

//files
import './App.css';
import NavbarMain from './LayoutComponent/NavbarMain';
import LeftSidebar from './LayoutComponent/LeftSidebar';

import SimpleBoxHome from './View/SimpleBoxHome';

function App() {

  return (
    <div className="App">
      {/* 네비게이션 바 */}
      <div className="main-nav">
        <NavbarMain/>
      </div>
      <div className="content">
        <div className="sidebar"> 
          <LeftSidebar />
        </div>
        <div className="main">
          <SimpleBoxHome />
        </div>
      </div>



    </div>
  );
}


export default App;