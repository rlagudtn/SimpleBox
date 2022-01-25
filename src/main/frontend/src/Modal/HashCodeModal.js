import './HashCodeModal.css';
import axios from 'axios';
import { useState } from 'react';

function HashCodeModal(props){
  let currentBox=props.selectedBox;
  let [hashCode,setHashCode]=useState("");
  function sendHashCode(){
    let data= new FormData();
    data.append('pandoraId',currentBox['id']);
    data.append('hashCode',hashCode);
    console.log(data);
    axios.post("/pandora/download",data).then((result)=>{
      alert("성공했습니다.");
      console.log(result.data);
    }).catch((error)=>{
      alert("실패했습니다.")
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
            <button onClick={sendHashCode}>
              {' '}
              확인{' '}
            </button>
          </footer>
        </section>
    </div>
  );
}
export default HashCodeModal;