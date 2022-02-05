import { useEffect, useState } from 'react';
import HashCodeModal from '../Modal/HashCodeModal';

// import PopupkeyModalToggle from '../Modal/PopupkeyModalToggle';
import {Row,Col,Container} from 'react-bootstrap';
import NavbarSub from '../LayoutComponent/NavbarSub';
import boxicon from '../boxicon.png'
import { Pandora } from '../DTO/Box';

function PandoraMain(){
  //검색어
  let [keyword,setKeyword]=useState("");

  //검색해서 얻은 결과
  let [boxes, setBoxes]=useState([{"id":"1","name":"새박스","count":"1"},{"id":"2","name":"스프링 실전","count":"0"}]);

  let[pandoraList,setPandoraList]=useState([]);

  // 박스키 입력 팝업 state
  let [keyModalToggle, setKeyModalToggle] = useState(false);

  // 클릭한 박스 제목 
  let [selectedBox, setSelectedBox] = useState(null);

  //controller에서 받아온 box들을 pandoraList로 변경함
  useEffect(()=>{
    let temp=[];
    boxes.map((item,i)=>{
      temp.push(new Pandora(item["id"],item["name"],item["count"]));
    });
    setPandoraList(temp);
  },[boxes]);
  useEffect(()=>{

  },[pandoraList])
  return(
    <div>
      {/* 상단 옵션 바 */}
      <Container className='main_optionbar'> 
        <NavbarSub keyword={keyword} setKeyword={setKeyword}  setBoxes={setBoxes} />
      </Container>

      {/* 박스들 배치 */}
      <Container className='main_boxes'>
        <Row>
          {
            pandoraList.map((item, index) => {
              if(item.count>0)
                return <BoxItem key={index} item={item} setKeyModalToggle={setKeyModalToggle} setSelectedBox={setSelectedBox}></BoxItem>
            })
          }

          {/* 박스를 클릭할 시 박스키 입력 팝업 */}
          
          {keyModalToggle!=false?
          <HashCodeModal  selectedBox={selectedBox} setSelectedBox={setSelectedBox} setKeyModalToggle={setKeyModalToggle}
          boxes={boxes} setBoxes={setBoxes} keyword={keyword}
          pandoraList={pandoraList} setPandoraList={setPandoraList}/>:
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
        {props.item.title}
      </Col>
    </>
  )
}

export default PandoraMain;