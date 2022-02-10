import './MakeHashCodeModal.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import {useHistory} from 'react-router-dom';
import {searchBoxes} from '../Function/search.js'

import _ from 'lodash';

function MakeHashCodeModal(props){
  let history = useHistory();

  // 초기에 저장버튼은 비활성화
  useEffect(()=>{
    document.querySelector('#save-button').disabled = true;
  }, []);

  // 서버로 박스 보내 저장하기
  function createBox(){
    // 서버로 보낼 폼데이터
    const fd = new FormData();
    fd.append('name', props.boxName);
    fd.append('count', props.openCount);
    fd.append('code', document.querySelector('#boxCode2').value);
    for (var i=0; i<props.filesIn.length; i++){
      fd.append('files', props.filesIn[i]);
    }
    for (var pair of fd.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }

    // 전송
    axios.post("/pandora", fd, {
      headers: {
        "Content-Type": `multipart/form-data`
      }
    })
    .then((result) => {
      alert('성공 : 박스가 저장되었습니다.');
      // 홈으로 라우팅
      history.push('/');
    }).catch(err => {
      alert('실패 : 박스를 저장하지 못했습니다.');
    })
  }

  // 두 비밀번호가 같은지 확인
  function codeCheck(){
    let code1 = document.querySelector('#boxCode1').value;
    let code2 = document.querySelector('#boxCode2').value;
    if(code1.length > 0 && (code1 == code2)){
      document.querySelector('#save-button').disabled = false;
    }
    else{
      document.querySelector('#save-button').disabled = true;
    }
  }

  return (
    <div className='openModal modal'>
      <section>
          <header>
            비밀번호 설정
            <button className="close" onClick={
              ()=>{
                props.setKeyModalToggle(false);
              }}>
              {' '}
              &times;{' '}
            </button>
          </header>

          <main>
            <div>설정할 비밀번호를 입력하세요.</div>
            <input type="password" name="boxCode" style={{'marginTop' : '2%'}} id="boxCode1" onChange={codeCheck}/>
            <div style={{'marginTop' : '5%'}}>비밀번호를 한번 더 입력하세요.</div>
            <input type="password" name="boxCode" style={{'marginTop' : '2%'}} id="boxCode2" onChange={codeCheck}/>
          </main>

          <footer>
            <button onClick={
              ()=>{
                createBox();
                props.setKeyModalToggle(false);
              }
            } id='save-button'>
              {' '}
              저장{' '}
            </button>
          </footer>
        </section>
    </div>
  );
}
export default MakeHashCodeModal;