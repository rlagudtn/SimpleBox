import './HashCodeModal.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import {useHistory} from 'react-router-dom';
import {searchBoxes} from '../Function/search.js'

import _ from 'lodash';

function HashCodeModal(props){
  let currentBox=props.selectedBox;
  let [hashCode,setHashCode] = useState("");
  let [status, setStatus] = useState("password");
  let [isValid, setIsValid] = useState(true);
  let [isWrongKey, setIsWrongKey] = useState(false);

  useEffect(()=>{
    let fd = new FormData();
    fd.append('pandoraId',currentBox.id);
    axios({
      method:"post",
      url:"/pandora/count",
      data: fd,
    }).then(response => {
      if(response.data <= 0){
        setStatus("banned");
        setIsValid(false);
      }
    })
  }, []);
  //controller에 hashcode 값을 보내는 함수
  function sendHashCode(){
    let data = new FormData();
    data.append('pandoraId', currentBox.id);
    data.append('hashCode', hashCode);
    axios({
      method:"post",
      url:"/pandora/download",
      data: data,
    }).then(async response => {

      setStatus("download");
      setIsValid(false);
      for(var i=0; i<response.data; i++){
        let tempFd = new FormData();
        tempFd.append('pandoraId', currentBox.id);
        tempFd.append('index', i);

        await axios({
          method:"post",
          url:"/pandora/download/file",
          data:tempFd,
          responseType:"blob"
        }).then(response => {
          const name=response.headers["content-disposition"].split("filename=")[1].replace(/"/g,"");
          // Blob 생성자 함수로 URL 생성하여 할당
          const url = window.URL.createObjectURL(response.data);
          // <a> 요소 동적 생성
          const link = document.createElement('a');
          // <a> 요소에 href attribute에 url 할당
          link.href = url;
          // <a> 요소에 download attribute 와 value 동적 할당
          link.setAttribute('download', name);
          // link html을 파일 이름으로 설정
          link.innerHTML = name;
          // file-list div 내에 링크 생성
          document.querySelector('.file-list').appendChild(link);
          // 줄바꿈을 위한 br태그 추가
          const br = document.createElement('br');
          document.querySelector('.file-list').appendChild(br);
        })
        .catch(e => {
          alert("오류가 발생하였습니다.");
        })  
      }
    })
    .catch(e => {
      if(e.response.status == 406){
        document.querySelector('.boxkey').value = "";
        setIsWrongKey(true);
      }
      else if(e.response.status == 410){
        alert("더 이상 열어볼 수 없는 박스입니다.");
        props.setKeyModalToggle(false);
        props.setSelectedBox(null);
      }
      else{
        alert("오류가 발생하였습니다.");
      }
    })
    
  }
  return (
    <div className='openModal modal'>
      <section>
          <header>
            {currentBox.title}
            <button className="close" onClick={
              ()=>{
                props.setKeyModalToggle(false);
                props.setSelectedBox(null);
              }}>
              {' '}
              &times;{' '}
            </button>
          </header>
              
          {
            <StatusRender status={status} setHashCode={setHashCode} isWrongKey={isWrongKey} setIsWrongKey={setIsWrongKey}></StatusRender>
          }

          <footer>
            <button onClick={
              ()=>{
                if(isValid){
                  sendHashCode();
                }
                else{
                  props.setKeyModalToggle(false);
                  props.setSelectedBox(null);
                }
              }
            }>
              {' '}
              확인{' '}
            </button>
          </footer> 
          
        </section>
    </div>
  );
}

function StatusRender(props){
  if(props.status == "password"){
    return(<>
      <main> 
        <p>박스키를 입력하세요.</p>
        <input className='boxkey' type="password" placeholder='password' onChange={(e)=>{
          props.setHashCode(e.target.value);
        }} onFocus={()=>{
          props.setIsWrongKey(false);
        }}/>
        {
          props.isWrongKey ?
          <p className='wrong-key'>잘못된 비밀번호 입니다.</p> :
          <p className='nothing-space'>nothing but space</p>
        }
      </main>
    </>)
  }
  else if(props.status == "download"){
    return(<>
      <main> <div className='file-list'></div> </main> 
    </>)
  }
  else{
    return(<>
      <main> <p>더 이상 열어볼 수 없는 박스입니다.</p> </main> 
    </>)
  }
}

export default HashCodeModal;