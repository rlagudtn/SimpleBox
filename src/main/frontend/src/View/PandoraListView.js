import boxicon from '../boxicon.png'


function PandoraListView(props){
    return(
        <div className="pandora-list">
            <div className="box-container">
                {props.boxObjectGroup.map((item, index) => {
                    return <BoxItem key={index} item={item} setKeyModalToggle={props.setKeyModalToggle} setSelectedBox={props.setSelectedBox}></BoxItem>
                })}
            </div>
        </div>
    )
}

// 박스 제목에 따른 각 박스
function BoxItem(props){
    return(
      <div className='box-item' onClick={(e)=>{
        props.setKeyModalToggle(true);
        props.setSelectedBox(props.item);
      }}>
        <img src={boxicon}/><br/>
        <div className="box-title">
          {props.item.name}
  
        </div>
      </div>
    )
  }
  
export default PandoraListView;

