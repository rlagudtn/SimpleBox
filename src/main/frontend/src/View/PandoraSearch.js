import './PandoraSearch.css'
import {Link} from 'react-router-dom'
function PandoraSearch(){
  return (
    <div className="pandora-search-main">
      <h2 className='pandora-title'>Pandora</h2>
      <div className="search-area">
      <Link to='/list'><button className='search-icon btn'><i class="fas fa-search"></i></button></Link>
        <input type="text" placeholder='박스 이름을 검색하세요' />
      </div>
      {/* <div className="jumbotron">      </div> */}
    </div>
  )
}

export default PandoraSearch;