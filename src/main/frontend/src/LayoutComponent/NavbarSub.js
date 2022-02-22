import {Row,Col,Button} from 'react-bootstrap';
import{Link} from 'react-router-dom';
import {searchBoxes} from '../Function/search.js'
import "./NavbarSub.css"
function NavbarSub(props){
  return(
    <div className='sub-nav'>
      <div className="search">
        <input type="text" size={30} placeholder=' 박스 명 검색' onChange={(e) => {
          props.setKeyword(e.target.value);
        }} />
        <button className='search-btn btn' onClick={() => {
          searchBoxes(props.keyword, props.setSearchedBoxGroup)
        }} ><i class="fas fa-search"></i></button>
      </div>
      <div className="new-box ">
        <Link to='/new'><button className='new-btn btn'>새 박스1</button></Link>
      </div>
    </div>
  );
}
export default NavbarSub;