/* eslint-disable react/no-direct-mutation-state */
import MakeHashCodeModal from '../Modal/MakeHashCodeModal';

import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import _ from 'lodash';

function NewPandora(){
  let history = useHistory();
  // 박스에 들어갈 파일들을 보관할 스테이트
  const [filesIn, setFilesIn] = useState([]);
  // 삭제 버튼의 활성화 여부
  const [isFileIn, setIsFileIn] = useState(false);
  // 박스 이름
  const [boxName, setBoxName] = useState("");
  // 공유 횟수
  const [openCount, setOpenCount] = useState(5);
  // 박스키 설정 팝업
  let [keyModalToggle, setKeyModalToggle] = useState(false);

  useEffect(()=>{
    if(filesIn.length > 0){
      setIsFileIn(true);
    }
    else{
      setIsFileIn(false);
    }
  }, [filesIn]);


  // 새 박스 만들 때 사용되는 Onclick함수
  const createBox = () => {
    if(document.querySelector('#boxtitle').value == ""){
      window.alert("박스 제목은 공백으로할 수 없습니다.");
    }
    else{
      setKeyModalToggle(true);
    }
  }

  function newFile(e){
    // 파일 추가
    if(e.target.files[0] != null){
      let temp = _.cloneDeep(filesIn);
      temp.push(e.target.files[0])
      setFilesIn(temp);
      e.target.value = "";
    }
  }

  function deleteFile(){
    // 파일 삭제
    let target = document.querySelectorAll(".file_checklist input:checked");

    let temp = _.cloneDeep(filesIn);
    for(var i=0; i<target.length; i++){
      temp.splice(target[i].value - i, 1);
    }
    setFilesIn(temp);

    target = document.querySelectorAll(".file_checklist input");
    for(i=0; i<target.length; i++){
      target[i].checked = false;
    }
  }

  return (
    <div>
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
            <input type="text" id='boxtitle' placeholder=' 박스 제목 입력' onChange={(e)=>{
              setBoxName(e.target.value);
            }}/>
            
            <label htmlFor="quantity" style={{ 'marginLeft': '2%', 'marginRight': '1%' }}>
              공유 횟수 지정 (최대 20회):
            </label>
            <input type="number" id="quantity" name="quantity" min="1" max="20" defaultValue={5} onChange={(e)=>{
              setOpenCount(e.target.value);
            }}/>
            <Button variant="success" style={{ 'marginLeft': '5%' }} onClick={createBox}>저장</Button>
            
            <br /><br />
            <div className="input-group mb-3">
              <input type="file" className="form-control" id="boxfile" accept='파일 확장자|image/*' onChange={newFile}/>
              <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
            </div>

            <Container className="file_checklist">
            {
              filesIn.map((item, index) => {
                return <FileItem index={index} fileName={item.name} key={index}></FileItem>
              })
            }
            {
              isFileIn ?
              <input type="button" value="삭제" style={{'marginTop' : '1%'}} onClick={deleteFile}/> :
              null
            }
            </Container>

            {keyModalToggle!=false?
              <MakeHashCodeModal  setKeyModalToggle={setKeyModalToggle} boxName={boxName} openCount={openCount} filesIn={filesIn}/>:
              null
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// 파일리스트에 따른 각 파일
function FileItem(props){
  return(
    <>
      <Col>
        <input className="form-check-input" type="checkbox" id={"file" + props.index} value={props.index}/>
        <label className="form-check-label" htmlFor={"file" + props.index} style={{'marginLeft' : '1%'}}>
          {props.fileName}
        </label>
      </Col>
    </>
  )
}


export default NewPandora;