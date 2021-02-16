import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavB from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Nav.css";
import Logo from "../Images/Logo.png";
import { CartFill } from "react-bootstrap-icons/";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("token");
    // let loggedIn = false;

    this.state = {
      User: localStorage.getItem("emailId"),
      // loggedIn: false,
    };
  }

  render() {
    return (
      <>
        {this.state.User ? (
          <>
            <Navbar
              collapseOnSelect
              expand='lg'
              bg='dark'
              variant='dark'
              className='Font-Raleway'
            >
              <Navbar.Brand className='ml-5'>
                <img src={Logo} alt='' width='120' />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <NavB className='mr-auto'></NavB>
                <NavB>
                  <NavB.Link className='m-3'>
                    <NavLink exact activeClassName='active' to='/'>
                      Home
                    </NavLink>
                  </NavB.Link>
                  <NavB.Link className='m-3'>
                    <NavLink
                      exact
                      activeClassName='active'
                      to='/Products?Cat=All'
                    >
                      Products
                    </NavLink>
                  </NavB.Link>
                  <NavB.Link className='m-3'>
                    <NavLink exact activeClassName='active' to='/Carrer'>
                      Carrer
                    </NavLink>
                  </NavB.Link>

                  <NavDropdown
                    title={this.state.User}
                    className='m-3'
                    id='collasible-nav-dropdown'
                  >
                    <NavDropdown.Item>
                      <NavLink exact activeClassName='active' to='/Myorder'>
                        My Orders
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink exact activeClassName='active' to='/Logout'>
                        Logout
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavB.Link className='m-3'>
                    <NavLink exact activeClassName='active' to='/Cart'>
                      <CartFill />
                    </NavLink>
                  </NavB.Link>
                </NavB>
              </Navbar.Collapse>
            </Navbar>
          </>
        ) : (
          <>
            <Navbar
              collapseOnSelect
              expand='lg'
              bg='dark'
              variant='dark'
              className='Font-Raleway'
            >
              <Navbar.Brand className='ml-5'>
                <img src={Logo} alt='' width='120' />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <NavB className='mr-auto'></NavB>
                <NavB>
                  <NavB.Link className='m-3'>
                    <NavLink exact activeClassName='active' to='/'>
                      Home
                    </NavLink>
                  </NavB.Link>
                  <NavB.Link className='m-3'>
                    <NavLink
                      exact
                      activeClassName='active'
                      to='/Products?Cat=All'
                    >
                      Products
                    </NavLink>
                  </NavB.Link>
                  <NavB.Link className='m-3'>
                    <NavLink exact activeClassName='active' to='/Carrer'>
                      Carrer
                    </NavLink>
                  </NavB.Link>
                  <NavB.Link className='m-3'>
                    <NavLink exact activeClassName='active' to='/Login'>
                      Login
                    </NavLink>
                  </NavB.Link>
                  <NavB.Link className='m-3'>
                    <NavLink exact activeClassName='active' to='/SignUp'>
                      SignUp
                    </NavLink>
                  </NavB.Link>
                  <NavB.Link className='m-3'>
                    <NavLink exact activeClassName='active' to='/Cart'>
                      <CartFill />
                    </NavLink>
                  </NavB.Link>
                </NavB>
              </Navbar.Collapse>
            </Navbar>
          </>
        )}
      </>
    );
  }
}
export default Nav;
