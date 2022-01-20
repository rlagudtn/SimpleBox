/* eslint-disable */

import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  let [items, setitems] = useState('hello');

  const formData = new FormData();

  const onChange = (e) => {
    const img = e.target.files[0];
    formData.append('img', img);
    formData.append('times', 5);
    formData.append('title', 'mybox');
    for(var pair of formData.entries()){
      console.log(pair[0] + ', ' + pair[1]);
    }
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
        <input type='file' 
            accept='image/jpg,image/png,image/jpeg,image/gif' 
            name='profile_img' 
            onChange={onChange}>
        </input>
      </div>

    </div>
  );
}

export default App;
