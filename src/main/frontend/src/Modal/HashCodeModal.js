import './HashCodeModal.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import {useHistory} from 'react-router-dom';
import {searchBoxes} from '../Function/search.js'

import _ from 'lodash';

function HashCodeModal(props){
  let currentBox=props.selectedBox;
  let [hashCode,setHashCode]=useState("");
  let [downloadToggle,setDownloadToggle]=useState(false);
  let [isValid, setIsValid] = useState(true);

  useEffect(()=>{
    let fd = new FormData();
    fd.append('pandoraId',currentBox.id);
    axios({
      method:"post",
      url:"/pandora/count",
      data: fd,
    }).then(response => {
      if(response.data <= 0){
        setIsValid(false);
      }
    })
  }, []);
  //controller에 hashcode 값을 보내는 함수
  async function sendHashCode(){
    let data= new FormData();
    data.append('pandoraId',currentBox.id);
    data.append('hashCode',hashCode);
    await axios({
      method:"post",
      url:"/pandora/download",
      data:data,
      responseType:"blob"
    }).then(response => {
        if(response.data == null){
          setIsValid(false);
        }
        else{
          const name=response.headers["content-disposition"].split("filename=")[1].replace(/"/g,"");
          // Blob 생성자 함수로 URL 생성하여 할당
          const url = window.URL.createObjectURL(response.data);
          // <a> 요소 동적 생성
          const link = document.createElement('a');
          // <a> 요소에 href attribute에 url 할당
          link.href = url;
          // <a> 요소에 download attribute 와 value 동적 할당
          link.setAttribute('download', name);
          // body 요소의 직계 자식으로 삽입 후 클릭
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
    })
    .catch(e => {
      if(e.response.status == 406){
        alert("잘못된 비밀번호 입니다.");
      }
      else if(e.response.status == 410){
        alert("더 이상 열어볼 수 없는 박스입니다.");
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
            isValid ? 
            <main> <p>박스키를 입력하세요.</p>
            <input type="password" placeholder='password' onChange={(e)=>{
              setHashCode(e.target.value)
            }}/></main> :
            <main> <p>더 이상 열어볼 수 없는 박스입니다.</p> </main> 
          }

          <footer>
            <button onClick={
              ()=>{
                if(isValid){
                  sendHashCode();
                  setDownloadToggle(true);
                }
                props.setKeyModalToggle(false);
                props.setSelectedBox(null);
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
export default HashCodeModal;