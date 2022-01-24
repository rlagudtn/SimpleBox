import {Nav} from 'react-bootstrap';
function LeftSidebar(){
    return (
      <div>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/">Active</Nav.Link>
          <Nav.Link eventKey="/">Link</Nav.Link>
          <Nav.Link eventKey="/">Link</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav>
      </div>

    );
}

export default LeftSidebar;