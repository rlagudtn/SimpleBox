import './BoxItemModal.css';
import axios from 'axios';
import { useEffect,useState } from 'react';

import _ from 'lodash';

/**
 * 
 * 
 * 
 */
 const PASSWORD ="PASSWORD";
  const DOWNLOAD="DOWNLOAD";
function BoxItemModal(props){
  /**
   * @constant
   * PASSWORD : 비밀번호를 누르는 상태
   * DOWNLOAD : 다운로드 가능한 파일들을 보여주는 상태
   * 
   * @reference
   * currentBox : 현재 선택한 박스 객체
   * 
   * @state
   * boxPassword : 사용자가 입력한 박스 비밀번호
   * configurationFiles : 가져온 박스를 구성하는 파일들
   * modalStatus : 모달창의 상태를 나타내는 변수
   * isWrongKey : 비밀번호가 틀렸는지 나타내는 변수
   */
 
  let currentBox=props.selectedBox;
  let [boxPassword,setBoxPassword] = useState("");
  let [configurationFiles,setConfigurationFiles]=useState([{"fileId":"1","fileName":"zip"}]);
  let [modalStatus, setModalStatus] = useState(PASSWORD);
  let [isWrongKey, setIsWrongKey] = useState(false);
  
 
  //controller에 boxPassword 값을 보내는 함수
  function sendboxPassword(){
    let data = new FormData();
    data.append("pandoraId", currentBox.id);
    data.append("boxPassword", boxPassword);
    axios({
      method:"post",
      url:"/pandora/download",
      data: data,
    }).then(async response => {
      setConfigurationFiles(response.data);
      console.log(response.data);
      setModalStatus(DOWNLOAD);
    })
    .catch(e => {
      if(e.response.modalStatus == 406){
        document.querySelector('.boxkey').value = "";
        setIsWrongKey(true);
      }
      else if(e.response.modalStatus == 410){
        alert("더 이상 열어볼 수 없는 박스입니다.");
        props.setKeyModalToggle(false);
        props.setSelectedBox(null);
      }
      else{
        alert("오류가 발생하였습니다.22");
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
            <modalStatusRender modalStatus={modalStatus} configurationFiles={configurationFiles} setBoxPassword={setBoxPassword} isWrongKey={isWrongKey} setIsWrongKey={setIsWrongKey}></modalStatusRender>
          }

          <footer>
            <button onClick={
              ()=>{
                if(modalStatus == PASSWORD){
                  sendboxPassword();
                }
                else{
                  props.setKeyModalToggle(false);
                  props.setSelectedBox(null);
                }
              }
            }>
              {' '}
              확인0{' '}
            </button>
          </footer> 
          
        </section>
    </div>
  );
}

function modalStatusRender(props){
  function downloadFile(fileId){
    let data = new FormData();
    data.append('fileId', fileId);
    axios({
      method: "post",
      url: "/pandora/download/file",
      data: data,
      responseType: "blob"
    }).then(response => {
      const name = response.headers["content-disposition"]
    .split("filename=")[1]
    .replace(/"/g, "");
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      link.style.cssText = "display:none";
      document.body.appendChild(link);
      link.click();
      link.remove();
        })
        .catch(e => {
          alert("오류가 발생하였습니다.11");
        })  
      
  }
  if(props.modalStatus === PASSWORD){
    return(<>
      <main> 
        <p>박스키를 입력하세요.</p>
        <input className='boxkey' type="password" placeholder='password' onChange={(e)=>{
          props.setBoxPassword(e.target.value);
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
  else if(props.modalStatus == DOWNLOAD){
    return(<>
      <main> 
        <div className='file-list'>
          {
            props.configurationFiles.map((item,index)=>{
              return <div onClick={()=>{downloadFile(item["fileId"])}}

              >{item["fileName"]}</div>
            })
          }
        </div> 
      </main> 
    </>)
  }
  else{
    return(<>
      <main> <p>더 이상 열어볼 수 없는 박스입니다.</p> </main> 
    </>)
  }
}

export default BoxItemModal;