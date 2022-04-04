import './BoxSearch.css'
import { Link } from 'react-router-dom'
import { searchBoxes } from '../Function/search.js'

/**
 * BoxSearch
 * 박스 검색 페이지
 * 
 * @author 태욱
 * @version 0.1, 코드리팩토링
 * @see 형수
 */
function BoxSearch(props) {
  return (
    <div className="box-search-main">
      <div className="header">
        <h2 className='title'>Search</h2>
        <Link to='/new'>
          <button className="snip1535 new-btn">New Box</button>
        </Link>
      </div>
      <div className="search">
        <Link to='/list'>
          <button className='search-icon'
          onClick={() => {
            searchBoxes(props.keyword, props.setSearchedBoxGroup)
          }}><i className="fas fa-search"></i></button>
        </Link>
        <input type="text" placeholder='박스 이름을 검색하세요' onChange={(e) => {
          props.setKeyword(e.target.value);
        }} />
      </div>
    </div>
  )
}

export default BoxSearch;