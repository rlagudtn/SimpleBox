import './HashCodeModal.css';
function HashCodeModal(props){
  return (
    <div className='openModal modal'>
      <section>
          <header>
            {props.selectedBox["name"]}
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
            <input type="password" placeholder='password' /></main>
          <footer>
            <button>
              {' '}
              확인{' '}
            </button>
          </footer>
        </section>
    </div>
  );
}
export default HashCodeModal;