/* eslint-disable */

//libs
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import React, {useState} from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom'
import axios from 'axios';

//files
import './App.css';
import search from './search.png';
import boxicon from './boxicon.png'
import PopupKeyask from './components/PopupKeyask';

function App() {

  // API로 받은 박스 제목들
  let [titles, settitles] = useState(['box_title1', 'box_title2', 'box_title3']);

  // 실제 보여지는 박스 제목들
  let [shows, setshows] = useState(titles.slice());

  // 박스키 입력 팝업 state
  let [keyask, setkeyask] = useState(false);

  // 클릭한 박스 제목 
  let [selected, setselected] = useState('');

  const openKeyask = () => {
    setkeyask(true);
  }

  const closeKeyask = () => {
    setkeyask(false);
  }

  let history = useHistory();

  // 서버로 전송할 박스 정보와 아이템을 담을 폼데이터
  const fd = new FormData();
  // 새 박스 만들 때 사용되는 Onclick함수
  const createBox = () => {
    fd.append('name', document.getElementById('boxtitle').value);
    fd.append('count', String(document.getElementById('quantity').value));
    fd.append('files', document.getElementById('boxfile').files[0]);

    // 서버에 보낼 데이터들 확인
    for(var pair of fd.entries()){
      console.log(pair[0] + ', ' + pair[1]);
    }

    // 전송
    axios.post("/pandora", fd, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then((result) => {
      alert('박스 저장 완료. 박스 비밀번호 : ' + result.data);
      // 홈으로 라우팅
      history.push('/');
    }).catch(err => {
      alert('실패 : 박스를 저장하지 못했습니다.');
    })

    // 전송 후 폼데이터 비우기
    fd.delete('name');
    fd.delete('count');
    fd.delete('files');    
  }


  return (
    <div className="App">

      {/* 네비게이션 바 */}
      <Navbar bg="light" expand="lg">
        <Container  className='navbar'>
          <Navbar.Brand href="/">▣ simplebox</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Action</NavDropdown.Item>
                <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                <NavDropdown.Item href="/">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      {/* 전체 페이지 */}
      <Container className='main_container'>
        <Row>

          {/* 사이드 바 */}
          <Col xs={3} className='sidebar'>
            
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="/">Active</Nav.Link>
              <Nav.Link eventKey="/">Link</Nav.Link>
              <Nav.Link eventKey="/">Link</Nav.Link>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav>

          </Col>

          {/* 메인 컨텐츠 */}
          <Col>
            <Switch>

            {/* 보관중인 박스들 나타내기 #1 */}
            <Route exact path='/'>

            {/* 상단 옵션 바 */}
            <Container className='main_optionbar'>
              <Row>
                <Col>
                  <input type="text" placeholder=' 박스 명 검색' onChange={(e) => {
                    let temp = [];
                    for(let i = 0; i<titles.length; i++){
                      if(titles[i].includes(e.target.value)){
                        temp.push(titles[i])
                      }
                    }
                    setshows(temp);
                  }}/>
                  <img src={search} style={{'marginLeft' : '1%'}}/>
                </Col>
                <Col  xs={3}>
                  <Link to='/new'><Button variant="primary" style={{'marginLeft' : '20%'}}>새 박스</Button></Link>
                </Col>
              </Row>
            </Container>

            {/* 박스들 배치 */}
            <Container className='main_boxes'>
              <Row>
                {
                  shows.map((a, b) => {
                    return <BoxItem boxtitle = {a} count = {b} setkeyask = {setkeyask}
                    setselected = {setselected}/>
                  })
                }

                {/* 박스를 클릭할 시 박스키 입력 팝업 */}
                <PopupKeyask open={keyask} close={closeKeyask} header={selected}>
                  <p>박스키를 입력하세요.</p>
                  <input type="password" placeholder='password'/>
                </PopupKeyask>
              </Row>
            </Container>
            </Route>

            {/* 새 박스 만들기 #2 */}
            <Route exact path='/new'>

            {/* 상단 옵션 바 */}
            <Container className='create_optionbar'>
              <Row>
                <Col>
                  <b>새 박스 만들기</b>
                </Col>
              </Row>
            </Container>

            {/* 새 박스 구성 및 저장 */}
            <Container className='create_contents'>
              <Row>
                <Col>
                <input type="text" id='boxtitle' placeholder=' 박스 제목 입력'/>
                <label htmlFor="quantity" style={{'marginLeft' : '2%', 'marginRight' : '1%'}}>
                  공유 횟수 지정 (최대 20회):
                </label>
                <input type="number" id="quantity" name="quantity" min="1" max="20" defaultValue={5}/>
                <Button variant="success" style={{'marginLeft' : '3%'}} onClick={createBox}>저장</Button>
                <br/><br/>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="boxfile" accept='image/jpg,image/png,image/jpeg,image/gif'/>
                  <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                </div>
                </Col>
              </Row>
            </Container>
            </Route>

            {/* 박스 내용물 나타내기 #3 */}

            </Switch>
          </Col>

        </Row>
      </Container>

    </div>
  );
}

// 박스 제목에 따른 각 박스
function BoxItem(props){

  return(
    <>
      <Col xs={3} style={{'textAlign' : 'center'}} onClick={(e)=>{
          props.setkeyask(true);
          props.setselected(props.boxtitle);
        }}>
        <img src={boxicon}/><br/>
        {props.boxtitle}
      </Col>
    </>
  )
}

export default App;
