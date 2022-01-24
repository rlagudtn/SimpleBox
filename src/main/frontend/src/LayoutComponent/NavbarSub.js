import axios from 'axios';
import {Row,Col,Button} from 'react-bootstrap';
import{Link} from 'react-router-dom';
import search from '../search.png';
import { useState } from 'react';
function NavbarSub(props){
  let [keyword,setKeyword]=useState("");
  const searchBoxes=()=>{
    axios.get("/pandora",{
      params:{
        keyword:keyword
      }
    })
    .then((result)=>{
      console.log(result);
      props.setBoxes(result.data);
    }).catch(err=>{
      alert('실패 : 박스를 찾는 도충 에러가 발생했습니다.');
    })
  }
  return(
    <div>
      <Row>
        <Col>
          <input type="text" placeholder=' 박스 명 검색' onChange={(e) => {
            setKeyword(e.target.value);
            // let temp = [];
            // for (let i = 0; i < props.titles.length; i++) {
            //   if (props.titles[i].includes(e.target.value)) {
            //     temp.push(props.titles[i])
            //   }
            // }
            // props.setshows(temp);
          }} />
          <Button variant="none" onClick={searchBoxes} ><img src={search} style={{ 'marginLeft': '1%' }}/></Button>
        </Col>
        <Col xs={3}>
          <Link to='/new'><Button variant="primary" style={{ 'marginLeft': '20%' }} >새 박스</Button></Link>
        </Col>
      </Row>
    </div>
  );
}
export default NavbarSub;