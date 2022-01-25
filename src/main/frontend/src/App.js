/* eslint-disable */

//libs
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom'

//files
import './App.css';
import NavbarMain from './LayoutComponent/NavbarMain';
import LeftSidebar from './LayoutComponent/LeftSidebar';
import PandoraMain from './EachBox/PandoraMain';
import NewPandora from './EachBox/NewPandora';
function App() {

 

  


  return (
    <div className="App">
      {/* 네비게이션 바 */}
      <NavbarMain/>

      {/* 전체 페이지 */}
      <Container className='main_container'>
        <Row>

          {/* 사이드 바 */}
          <Col xs={3} className='sidebar'>
            <LeftSidebar/>
            

          </Col>

          {/* 메인 컨텐츠 */}
          <Col>
            <Switch>
            {/* 박스 목록 */}
            <Route exact path='/'>
              <PandoraMain/>
            </Route>

            {/* 새 박스 만들기 #2 */}
            <Route exact path='/new'>
              <NewPandora/>
            </Route>

            {/* 박스 내용물 나타내기 #3 */}

            </Switch>
          </Col>

        </Row>
      </Container>

    </div>
  );
}


export default App;
