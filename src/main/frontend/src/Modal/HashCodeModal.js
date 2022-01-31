import './HashCodeModal.css';
import axios from 'axios';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import _ from 'lodash';

function HashCodeModal(props){
  let currentBox=props.selectedBox;
  let [hashCode,setHashCode]=useState("");
  let setBoxes = props.setBoxes;
  let boxes = props.boxes;

  //controller에 hashcode 값을 보내는 함수
  function sendHashCode(){
    let data= new FormData();
    data.append('pandoraId',currentBox['id']);
    data.append('hashCode',hashCode);
    console.log(data);
    axios({
      method:"post",
      url:"/pandora/download",
      data:data,
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
      // body 요소의 직계 자식으로 삽입 후 클릭
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      data.delete('hashCode');
      // 파일을 받아온 후 count가 0인지 검사
      axios({
        method:"post",
        url : "/pandora/count",
        data : data
      }).then(response => {
        // count가 0이면 boxes에서 제외
        if(response.data == 0){
          let temp = _.cloneDeep(boxes);
          for(let i = 0; i < temp.length; i++){
            if(temp[i].id == currentBox.id){
              temp.splice(i, 1);
              i--;
            }
          }
          setBoxes(temp);
        }
      })

    })
    .catch(e => {
      console.error(e);
    })
  }
  return (
    <div className='openModal modal'>
      <section>
          <header>
            {currentBox["name"]}
            <button className="close" onClick={
              ()=>{
                props.setKeyModalToggle(false);
                props.setSelectedBox(null);
              }}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main> <p>박스키를 입력하세요.</p>
            <input type="password" placeholder='password' onChange={(e)=>{
              setHashCode(e.target.value)
              console.log(hashCode);
            }}/></main>
          <footer>
            <button onClick={
              ()=>{
                sendHashCode();
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