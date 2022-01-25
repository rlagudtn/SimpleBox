import { useState } from 'react';
import HashCodeModal from '../Modal/HashCodeModal';

// import PopupkeyModalToggle from '../Modal/PopupkeyModalToggle';
import {Row,Col,Container} from 'react-bootstrap';
import NavbarSub from '../LayoutComponent/NavbarSub';
import boxicon from '../boxicon.png'

function PandoraMain(){
  let [boxes,setBoxes]=useState([{"id":"1","name":"새박스"},{"id":"2","name":"스프링 실전"}]);
  // API로 받은 박스 제목들
  let [titles, settitles] = useState(['box_title1', 'box_title2', 'box_title3']);

  // 실제 보여지는 박스 제목들
  let [shows, setshows] = useState(titles.slice());
  // 박스키 입력 팝업 state
  let [keyModalToggle, setKeyModalToggle] = useState(false);

  // 클릭한 박스 제목 
  let [selectedBox, setSelectedBox] = useState(null);

  return(
    <div>
      {/* 상단 옵션 바 */}
      <Container className='main_optionbar'> 
        <NavbarSub titles={titles} setshows={setshows} setBoxes={setBoxes} />
      </Container>

      {/* 박스들 배치 */}
      <Container className='main_boxes'>
        <Row>
          {
            boxes.map((item, index) => {
              return <BoxItem item={item} setKeyModalToggle={setKeyModalToggle} setSelectedBox={setSelectedBox}></BoxItem>
            })
            // shows.map((a, b) => {
            //   return <BoxItem boxtitle = {a} count = {b} setKeyModalToggle = {setKeyModalToggle}
            //   setselected = {setselected}/>
            // })
          }

          {/* 박스를 클릭할 시 박스키 입력 팝업 */}
          
          {keyModalToggle!=false?
          <HashCodeModal  selectedBox={selectedBox} setSelectedBox={setSelectedBox} setKeyModalToggle={setKeyModalToggle}/>:
          null
          }
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
          props.setKeyModalToggle(true);
          props.setSelectedBox(props.item);
        }}>
        <img src={boxicon}/><br/>
        {props.item["name"]}
      </Col>
    </>
  )
}

export default PandoraMain;