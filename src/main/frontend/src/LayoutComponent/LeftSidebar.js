import {Nav} from 'react-bootstrap';
function LeftSidebar(){
    return (
      <div>
        <Nav  fill variant='pills' defaultActiveKey="/" className="flex-column">
          <Nav.Item>
            <Nav.Link href="/">공용 컨테이너</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/private">내 컨테이너</Nav.Link>
          </Nav.Item>
          
        </Nav>
        
      </div>

    );
}

export default LeftSidebar;