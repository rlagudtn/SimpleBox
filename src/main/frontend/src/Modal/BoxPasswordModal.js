import './BoxPasswordModal.css';
import axios from 'axios';
import { useEffect } from 'react';
import {useHistory} from 'react-router-dom';

/**
 * BoxPasswordModal
 * 박스 비밀번호 설정 모달
 * 
 * @author 태욱
 * @version 0.1, 코드리팩토링
 * @see 형수
 */
function BoxPasswordModal(props){
  let history = useHistory();

  // 초기에 저장버튼은 비활성화
  useEffect(()=>{
    document.querySelector('.save-btn').disabled = true;
  }, []);

  // 서버로 박스 보내 저장하기
  function sendBox(){
    // 서버로 보낼 폼데이터
    const fd = new FormData();
    fd.append('name', props.boxName);
    // 삭제 예정
    fd.append('count', props.openCount);
    fd.append('code', document.querySelector('.confirm-password-input').value);
    for (var i=0; i<props.filesToSend.length; i++){
      fd.append('files', props.filesToSend[i]);
    }

    // 전송
    axios.post("/pandora", fd, {
      headers: {
        "Content-Type": `multipart/form-data`
      }
    })
    .then(() => {
      alert('성공 : 박스가 저장되었습니다.');
      // 홈으로 라우팅
      history.push('/');
    }).catch(() => {
      alert('실패 : 박스를 저장하지 못했습니다.');
    })
  }

  // 두 비밀번호가 같은지 확인
  function checkPasswordsEqual(){
    let code1 = document.querySelector('.password-input').value;
    let code2 = document.querySelector('.confirm-password-input').value;
    if(code1.length > 0 && (code1 == code2))
      document.querySelector('.save-btn').disabled = false;
    else
      document.querySelector('.save-btn').disabled = true;
  }

  return (
    <div className='open-modal modal'>
      <section>
          <header>
            비밀번호 설정
            <button onClick={
              ()=>{
                props.setKeyModalToggle(false);
              }}>
              {' '}
              &times;{' '}
            </button>
          </header>

          <main>
            <div>설정할 비밀번호를 입력하세요.</div>
            <input type="password" name="boxCode" style={{'marginTop' : '2%'}} className="password-input" onChange={checkPasswordsEqual}/>
            <div style={{'marginTop' : '5%'}}>비밀번호를 한번 더 입력하세요.</div>
            <input type="password" name="boxCode" style={{'marginTop' : '2%'}} className="confirm-password-input" onChange={checkPasswordsEqual}/>
          </main>

          <footer>
            <button onClick={
              ()=>{
                sendBox();
                props.setKeyModalToggle(false);
              }
            } className='save-btn'>
              {' '}
              저장{' '}
            </button>
          </footer>
        </section>
    </div>
  );
}
export default BoxPasswordModal;