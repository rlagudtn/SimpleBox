import { useEffect, useState } from 'react';
import HashCodeModal from '../Modal/HashCodeModal';
import {Link, Route, Switch, useHistory} from 'react-router-dom'

// import PopupkeyModalToggle from '../Modal/PopupkeyModalToggle';
import {Row,Col,Container} from 'react-bootstrap';
import NavbarSub from '../LayoutComponent/NavbarSub';
import boxicon from '../boxicon.png'
import { Pandora } from '../DTO/Box';
import NewPandora from '../View/NewPandora';
import PandoraSearch from '../View/PandoraSearch';
import './PandoraMain.css'
function PandoraMain(){
  //검색어
  let [keyword,setKeyword]=useState("");

  //검색해서 얻은 결과
  let [boxes, setBoxes]=useState([{"id":"1","name":"새박스","count":"1"},{"id":"2","name":"스프링 실전","count":"1"},
  {"id":"1","name":"새박스","count":"1"},{"id":"2","name":"스프링 실전","count":"1"},
  {"id":"1","name":"새박스","count":"1"},{"id":"2","name":"스프링 실전","count":"1"},
  {"id":"1","name":"새박스","count":"1"},{"id":"2","name":"스프링 실전","count":"1"},
  {"id":"1","name":"새박스","count":"1"},{"id":"2","name":"스프링 실전","count":"1"}]);

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
      <Switch>
        <Route exact path='/'>
          <PandoraSearch keyword={keyword} setKeyword={setKeyword} setBoxes={setBoxes}  />
        </Route>
        <Route exact path='/list'>
          {/* 상단 옵션 바 */}
          <div className="search-bar">
            <NavbarSub keyword={keyword} setKeyword={setKeyword} setBoxes={setBoxes} />
          </div>
          <div className="pandora-list">
            <div className="box-container">
              {pandoraList.map((item, index) => {
                return <BoxItem key={index} item={item} setKeyModalToggle={setKeyModalToggle} setSelectedBox={setSelectedBox}></BoxItem>
              })}
            </div>
          </div>

          {keyModalToggle != false ?
            <HashCodeModal selectedBox={selectedBox} setSelectedBox={setSelectedBox} setKeyModalToggle={setKeyModalToggle}
              boxes={boxes} setBoxes={setBoxes} keyword={keyword}
              pandoraList={pandoraList} setPandoraList={setPandoraList} /> :
            null
          }
        </Route>
        {/* 새 박스 만들기 #2 */}
        <Route exact path='/new'>
          <NewPandora />
        </Route>

        {/* 박스 내용물 나타내기 #3 */}
      </Switch>

    </div>
  );
}

// 박스 제목에 따른 각 박스
function BoxItem(props){
  return(
    <div className='box-item' onClick={(e)=>{
      props.setKeyModalToggle(true);
      props.setSelectedBox(props.item);
    }}>
      <img src={boxicon}/><br/>
      <div className="box-title">
        {props.item.title}

      </div>
    </div>
  )
}

export default PandoraMain;