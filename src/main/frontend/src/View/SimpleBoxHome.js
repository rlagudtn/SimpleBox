import { useEffect, useState } from 'react';
import BoxItemModal from '../Modal/BoxItemModal';
import {Link, Route, Switch, useHistory} from 'react-router-dom'
import NavbarSub from '../LayoutComponent/NavbarSub';
import Box from '../DTO/Box';
import BoxCreation from './BoxCreation';
import BoxSearch from './BoxSearch';
import BoxListView from './BoxListView';

/**
 * SimpleBoxHome
 * 심플박스에 대한 페이지들 라우팅
 * 
 * @author 태욱
 * @version 0.1, 코드리팩토링
 * @see 형수
 */

function SimpleBoxHome(){
  /**
   * @state
   * keyword : 박스 검색에 사용되는 검색어
   * searchedBoxGroup : 검색 결과로 받아온 박스 정보 그룹
   * boxObjectGroup : 목록에 보여질 박스 객체들 그룹
   * keyModalToggle : 모달창을 띄우기 위한 변수
   * selectedBox : 사용자가 클릭한 박스 객체
   * 
   * 
   */
  let [keyword,setKeyword]=useState("");
  let [searchedBoxGroup, setSearchedBoxGroup]=useState([{"id":"1","name":"새박스"},{"id":"2","name":"스프링 실전"},
  {"id":"1","name":"새박스"},{"id":"2","name":"스프링 실전"},
  {"id":"1","name":"새박스"},{"id":"2","name":"스프링 실전"},
  {"id":"1","name":"새박스"},{"id":"2","name":"스프링 실전"},
  {"id":"1","name":"새박스"},{"id":"2","name":"스프링 실전"}]);
  let[boxObjectGroup,setBoxObjectGroup]=useState([]);
  let [keyModalToggle, setKeyModalToggle] = useState(false);
  let [selectedBox, setSelectedBox] = useState(null);

  //controller에서 받아온 box들을 boxObjectGroup로 변경함
  useEffect(()=>{
    let temp=[];
    searchedBoxGroup.map((item,i)=>{
      temp.push(new Box(item["id"],item["name"]));
    });
    setBoxObjectGroup(temp);
  },[searchedBoxGroup]);
  useEffect(()=>{

  },[boxObjectGroup])
  return(
    <div>
      <Switch>
        <Route exact path='/'>
          <BoxSearch keyword={keyword} setKeyword={setKeyword} setSearchedBoxGroup={setSearchedBoxGroup}  />
        </Route>
        <Route exact path='/list'>
          {/* 상단 옵션 바 */}
          <div className="search-bar">
            <NavbarSub keyword={keyword} setKeyword={setKeyword} setSearchedBoxGroup={setSearchedBoxGroup} />
          </div>

          <BoxListView boxObjectGroup={boxObjectGroup} setKeyModalToggle={setKeyModalToggle} setSelectedBox={setSelectedBox} />
          
          {keyModalToggle != false ?
            <BoxItemModal selectedBox={selectedBox} setSelectedBox={setSelectedBox} setKeyModalToggle={setKeyModalToggle} /> 
            :
            null
          }
        </Route>
        {/* 새 박스 만들기 #2 */}
        <Route exact path='/new'>
          <BoxCreation />
        </Route>

        {/* 박스 내용물 나타내기 #3 */}
      </Switch>

    </div>
  );
}

export default SimpleBoxHome;