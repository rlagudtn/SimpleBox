/* eslint-disable react/no-direct-mutation-state */
import MakeHashCodeModal from '../Modal/MakeHashCodeModal';

import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import _ from 'lodash';
import './NewPandora.css'
import upload from './upload.png';

function NewPandora(){
  let history = useHistory();
  // 박스에 들어갈 파일들을 보관할 스테이트
  const [filesIn, setFilesIn] = useState([]);
  // 드래그앤드롭 알림의 활성화 여부
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
    let target = document.querySelectorAll(".file-list input:checked");

    let temp = _.cloneDeep(filesIn);
    for(var i=0; i<target.length; i++){
      temp.splice(target[i].value - i, 1);
    }
    setFilesIn(temp);

    target = document.querySelectorAll(".file-list input");
    for(i=0; i<target.length; i++){
      target[i].checked = false;
    }
  }

  // 파일 용량 확인을 위한 함수
  function checkFileSize(bytes, decimal = 2){
    if (bytes == 0){
      return '0B';
    }
    const k = 1000;
    const dm = decimal;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`
  }

  // 전체 체크박스를 통제하는 체크박스 함수
  function allCheck(e){
    let target = document.querySelectorAll(".file-list input");
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
  function dropFile(e){
    // 기존 효과 제거
    e.preventDefault();

    let temp = _.cloneDeep(filesIn);
    for(let i=0; i<e.dataTransfer.files.length; i++){
      temp.push(e.dataTransfer.files[i]);
    }
    setFilesIn(temp);
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
            <Button variant="success" style={{ 'marginLeft': '28%' }} onClick={createBox}>저장</Button>
            
            <br /><br />
            <label className="input-file-button" htmlFor="boxfile" >내 PC</label>
            <input type="file" id="boxfile" style={{display:"none"}} accept='파일 확장자|image/*' onChange={newFile}/>
            <div className='input-file-button' onClick={deleteFile}>삭제</div>
            <br/>

            <div className='file-list' onDrop={dropFile} onDragOver={(e) => {
              e.preventDefault();
            }}>
              <div className='file-list-header'>
                <div className='item'>
                  <input type="checkbox" onChange={allCheck}/>
                  <span style={{'marginLeft' : '1%'}}>파일 명</span>
                </div>
                
                <div className='size'>
                  <span>파일 용량</span>
                </div>
              </div>
              <div className='file-list-files'>
              {
                isFileIn?
                null:
                <div className='drag-drop-notion'>
                  <img src={upload}/> <b>파일을 드래그하여 업로드</b>
                </div>
              }
              {
                filesIn.map((item, index) => {
                  return <FileItem index={index} fileName={item.name} fileSize={item.size} key={index}  checkFileSize={checkFileSize}></FileItem>
                })
              }
              </div>
            </div>

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
      <div className='file-item'>
        <div className='item'>
          <input type="checkbox" id={"file" + props.index} value={props.index}/>
          <label className="form-check-label" htmlFor={"file" + props.index} style={{'marginLeft' : '1%'}}>
            {props.fileName}
          </label>
        </div>
        
        <div className='size'>
          {props.checkFileSize(props.fileSize)}
        </div>
      </div>
    </>
  )
}


export default NewPandora;