import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
function NewPandora(){
  let history = useHistory();
  // 서버로 전송할 박스 정보와 아이템을 담을 폼데이터
  const fd = new FormData();
  // 새 박스 만들 때 사용되는 Onclick함수
  const createBox = () => {
    fd.append('name', document.querySelector('#boxtitle').value);
    fd.append('count', document.querySelector('#quantity').value);
    fd.append('files', document.querySelector('#boxfile').files[0]);
    fd.append('code', document.querySelector('#code').value);

    // 전송
    axios.post("/pandora", fd, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then((result) => {
      alert('성공 : 박스가 저장되었습니다.');
      // 홈으로 라우팅
      history.push('/');
    }).catch(err => {
      alert('실패 : 박스를 저장하지 못했습니다.');
    })

    // 전송 후 폼데이터 비우기
    fd.delete('name');
    fd.delete('count');
    fd.delete('files');  
  }
  return (
    <div>
      {/* 상단 옵션 바 */}
      <Container className='create_optionbar'>
        <Row>
          <Col>
            <b>새 박스 만들기</b>
          </Col>
        </Row>
      </Container>

      {/* 새 박스 구성 및 저장 */}
      <Container className='create_contents'>
        <Row>
          <Col>
            <input type="text" id='boxtitle' placeholder=' 박스 제목 입력' /><br/>
            <input type="text" id="code" style={{"marginTop":'2%'}} placeholder=" 암호를 입력"/>
            
            <label htmlFor="quantity" style={{ 'marginLeft': '2%', 'marginRight': '1%' }}>
              공유 횟수 지정 (최대 20회):
            </label>
            <input type="number" id="quantity" name="quantity" min="1" max="20" defaultValue={5} />
            <Button variant="success" style={{ 'marginLeft': '3%' }} onClick={createBox}>저장</Button>
            <br /><br />
            <div className="input-group mb-3">
              <input type="file" className="form-control" id="boxfile" accept='image/jpg,image/png,image/jpeg,image/gif' />
              <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default NewPandora;