/* eslint-disable react/no-direct-mutation-state */
import BoxPasswordModal from '../Modal/BoxPasswordModal';
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import _ from 'lodash';
import './BoxCreation.css'
import upload from './upload.png';

/**
 * BoxCreation
 * 새 박스 제작 페이지
 * 
 * @author 태욱
 * @version 0.1, 코드리팩토링
 * @see 형수
 */
function BoxCreation(){
  /**
   * @state
   * filesToSend : 웹 서버에 보낼 파일들 리스트
   * doesFileExist : filesToSend에 파일이 존재하는지 여부
   * boxObjectGroup : 목록에 보여질 박스 객체들 그룹
   * keyModalToggle : 모달창을 띄우기 위한 변수
   * 
   */
  let history = useHistory();
  const [filesToSend, setFilesToSend] = useState([]);
  const [doesFileExist, setDoesFileExist] = useState(false);
  const [boxName, setBoxName] = useState("");
  // 공유 횟수(삭제 예정)
  const [openCount, setOpenCount] = useState(5);
  let [keyModalToggle, setKeyModalToggle] = useState(false);

  useEffect(()=>{
    if(filesToSend.length > 0)
      setDoesFileExist(true);
    else
      setDoesFileExist(false);
  }, [filesToSend]);


  // 새 박스 만들 때 사용되는 Onclick함수
  function createBox(){
    if(document.querySelector('.box-title').value != "")
      setKeyModalToggle(true);
    else
      window.alert("박스 제목은 공백으로할 수 없습니다.");
  }

  // 탐색기로 추가한 파일을 filesToSend에 추가하는 함수
  function addFile(e){
    if(e.target.files[0] != null){
      let temp = _.cloneDeep(filesToSend);
      temp.push(e.target.files[0])
      setFilesToSend(temp);
      e.target.value = "";
    }
  }

  // 체크된 파일들을 삭제하는 함수(로직 수정 예정)
  function deleteFiles(){
    let target = document.querySelectorAll(".file-section input:checked");

    let temp = _.cloneDeep(filesToSend);
    for(var i=0; i<target.length; i++){
      temp.splice(target[i].value - i, 1);
    }
    setFilesToSend(temp);

    target = document.querySelectorAll(".file-section input");
    for(i=0; i<target.length; i++){
      target[i].checked = false;
    }
  }

  // 파일 용량 확인을 위한 함수
  function fileSize(bytes, decimal = 2){
    if (bytes == 0)
      return '0B';

    const k = 1000;
    const dm = decimal;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`
  }

  // 체크박스 토글 전체선택 및 해제
  function changeAllToggles(e){
    let target = document.querySelectorAll(".file-section input");
    if(e.target.checked){
      for(let i=0; i<target.length; i++){
        target[i].checked = true;
      }
    }
    else{
      for(let i=0; i<target.length; i++){
        target[i].checked = false;
      }
    }
  }

  // 파일을 드래그하여 업로드하는 함수
  function dropFiles(e){
    // 기존 효과 제거
    e.preventDefault();

    let temp = _.cloneDeep(filesToSend);
    for(let i=0; i<e.dataTransfer.files.length; i++){
      temp.push(e.dataTransfer.files[i]);
    }
    setFilesToSend(temp);
  }

  return (
    <div className='box-creation'>
      {/* 상단 옵션 바 */}
      <Container className='title'>
        <Row>
          <Col>
            <b>새 박스 만들기</b>
          </Col>
        </Row>
      </Container>

      {/* 새 박스 구성 및 저장 */}
      <Container className='main'>
        <Row>
          <Col>
            <input type="text" className='box-title' placeholder=' 박스 제목 입력' onChange={(e)=>{
              setBoxName(e.target.value);
            }}/>
            
            <label htmlFor="quantity" style={{ 'marginLeft': '2%', 'marginRight': '1%' }}>
              공유 횟수 지정 (최대 20회):
            </label>
            {/* 삭제 예정 */}
            <input type="number" id="quantity" name="quantity" min="1" max="20" defaultValue={5} onChange={(e)=>{
              setOpenCount(e.target.value);
            }}/>
            <Button variant="success" style={{ 'marginLeft': '28%' }} onClick={createBox}>저장</Button>
            
            <br /><br />
            <label className="my-pc-btn" htmlFor="my-pc" >내 PC</label>
            <input type="file" id="my-pc" style={{display:"none"}} accept='파일 확장자|image/*' onChange={addFile}/>
            <div className='my-pc-btn' onClick={deleteFiles}>삭제</div>
            <br/>

            <div className='file-section' onDrop={dropFiles} onDragOver={(e) => {
              e.preventDefault();
            }}>
              <div className='file-section-header'>
                <div>
                  <input type="checkbox" onChange={changeAllToggles}/>
                  <span style={{'marginLeft' : '1%'}}>파일 명</span>
                </div>
                
                <div className='file-size'>
                  <span>파일 용량</span>
                </div>
              </div>
              <div className='file-list'>
              {
                doesFileExist?
                null:
                <div className='drag-drop-notion'>
                  <img src={upload}/> <b>파일을 드래그하여 업로드</b>
                </div>
              }
              {
                filesToSend.map((item, index) => {
                  return <FileItem index={index} fileName={item.name} itemSize={item.size} key={index}  fileSize={fileSize}></FileItem>
                })
              }
              </div>
            </div>

            {keyModalToggle!=false?
              <BoxPasswordModal  setKeyModalToggle={setKeyModalToggle} boxName={boxName} openCount={openCount} filesToSend={filesToSend}/>:
              null
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// 파일리스트에 따른 각 파일
function FileItem(props) {
  return (
    <div className='file-item'>
      <div>
        <input type="checkbox" id={"file" + props.index} value={props.index} />
        <label className="form-check-label" htmlFor={"file" + props.index} style={{ 'marginLeft': '1%' }}>
          {props.fileName}
        </label>
      </div>

      <div className='file-size'>
        {props.fileSize(props.itemSize)}
      </div>
    </div>
  )
}


export default BoxCreation;