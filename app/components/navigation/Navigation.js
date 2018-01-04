import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem } from 'react-bootstrap'
import NavBar from 'react-bootstrap/lib/Navbar'

export default class Navigation extends React.Component {
  render() {
    return (
      <div className="col-lg-12 md-margintop">
        <NavBar id="header">
          <NavBar.Header>
            <NavBar.Brand>
              <Link id="header__brand" to="/">Posts Notes</Link>
            </NavBar.Brand>
          </NavBar.Header>
          <Nav>
            <LinkContainer className="header__list-item"
              onClick={() => {_.isEmpty(this.props.user) ? '' : this.props.handleLogOut()}}
              to={_.isEmpty(this.props.user) ? '/RegisterOrLogin' : '/'} >
                <NavItem>{_.isEmpty(this.props.user) ? 'Login' : 'Logout ' + this.props.user.email}</NavItem>
            </LinkContainer>
            <NavItem className="header__list-item" href="/about">About</NavItem>
          </Nav>
        </NavBar>
      </div>
    );
  }
}
