import axios from 'axios';
/////////////callback: 찾은 박스들을 저장하는 함수 ex setBoxes
function searchBoxes(keyword,callback){
  axios.get("/pandora",{
    params:{
      keyword:keyword
    }
  })
  .then((result)=>{
    callback(result.data);
  }).catch(err=>{
    alert('실패 : 박스를 찾는 도충 에러가 발생했습니다.');
  })
}
export {searchBoxes}