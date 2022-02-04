import {Row,Col,Button} from 'react-bootstrap';
import{Link} from 'react-router-dom';
import search from '../search.png';
import { useState } from 'react';
import {searchBoxes} from '../Function/search.js'
function NavbarSub(props){
  return(
    <div>
      <Row>
        <Col>
          <input type="text" placeholder=' 박스 명 검색' onChange={(e) => {
            props.setKeyword(e.target.value);
            
          }} />
          <Button variant="none" onClick={()=>{
            searchBoxes(props.keyword,props.setBoxes)
          }} ><img src={search} style={{ 'marginLeft': '1%' }}/></Button>
        </Col>
        <Col xs={3}>
          <Link to='/new'><Button variant="primary" style={{ 'marginLeft': '20%' }} >새 박스</Button></Link>
        </Col>
      </Row>
    </div>
  );
}
export default NavbarSub;