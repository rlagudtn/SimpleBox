/* eslint-disable */

import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  let [items, setitems] = useState('hello');
  let [name,setName]=useState("");
  const formData = new FormData();


  const onChange = (e) => {
    const img = e.target.files[0];
    const body=JSON.stringify({
        name:name,
    });
    let count=10;
      formData.append('img', img);
      formData.append('name',name);
      formData.append('count',count.toString());

  }

  return (
    <div className="App">
      <h1>HELLO WORLD!</h1>

      <button onClick={()=>{
        axios.get('/api/hello')
        .then((result)=>{
          setitems(result.data);
        })
        .catch(()=>{console.log('fail');})
      }}>get</button>

      <button onClick={()=>{
        axios.post('/api/hello', {
            data: "post complete!"
        })
        .then((result)=>{
            setitems(result.data);
        })
      }}>post</button>
      <br />
      {items}

      <br/>
      <br/>

      <div>
      <button onClick={()=>{

        axios.post("/api/banzai", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        })
        .then((result) => {
          alert('성공');
        }).catch(err => {
          alert('실패');
        })
        formData.delete('img');
      }}>bomb</button>
      </div>

      <div>
          <form >
              <input type="text" onChange={(e)=>{
                setName(e.target.value)
                console.log(name);
                }}/>
              <input type='file'
                     accept='image/jpg,image/png,image/jpeg,image/gif'
                     name='profile_img'
                     onChange={onChange}>
              </input>
          </form>

      </div>

    </div>
  );
}

export default App;
