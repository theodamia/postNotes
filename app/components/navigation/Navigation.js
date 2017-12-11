import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem } from 'react-bootstrap'
import NavBar from 'react-bootstrap/lib/Navbar'

export default class Navigation extends React.Component {
  render() {
    return (
      <div className="col-lg-12 md-margintop">
        <NavBar className="nav-bar">
          <NavBar.Header>
            <NavBar.Brand>
              <Link className="brand" to="/">Post Notes</Link>
            </NavBar.Brand>
          </NavBar.Header>
          <Nav id="nav-list">
            <LinkContainer
              className="nav-item"
              onClick={() => {_.isEmpty(this.props.user) ? '' : this.props.handleLogOut()}}
              to={_.isEmpty(this.props.user) ? '/RegisterOrLogin' : '/'} >
                <NavItem>{_.isEmpty(this.props.user) ? 'Login' : 'Logout ' + this.props.user.email}</NavItem>
            </LinkContainer>
            <NavItem href="/about">About</NavItem>
          </Nav>
        </NavBar>
      </div>
    );
  }
}
