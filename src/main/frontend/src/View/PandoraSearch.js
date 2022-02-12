import './PandoraSearch.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {searchBoxes} from '../Function/search.js'
function PandoraSearch(props){
  return (
    <div className="pandora-search-main">
      <div className="title-section">
      <h2 className='pandora-title'>Pandora</h2>
      <Link to='/new'><button className="snip1535 new-btn">+New Box</button></Link>
      </div>
      <div className="search-area">
      <Link to='/list'><button className='search-icon btn'
      onClick={() => {
        searchBoxes(props.keyword, props.setBoxes)
      }}><i class="fas fa-search"></i></button></Link>
        <input type="text" placeholder='박스 이름을 검색하세요' onChange={(e)=>{
          props.setKeyword(e.target.value);
        }}/>
      </div>
      {/* <div className="jumbotron"></div> */}
    </div>
  )
}

export default PandoraSearch;