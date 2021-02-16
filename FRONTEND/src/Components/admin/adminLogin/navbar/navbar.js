import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class adminNav extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("admintoken");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false;
    }

    this.state = {
      adminName: localStorage.getItem("adminName"),
      loggedIn,
    };
  }

  render() {
    if (this.state.loggedIn === false)
      return <Redirect exact to='/admin/login' />;
    return (
      <>
        <Navbar bg='dark' expand='lg'>
          <Navbar.Brand className='ml-2'>
            <NavLink exact activeClassName='active' to='/admin/dashboard'>
              Dashboard
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link className='ml-2'>
                <NavLink
                  className='pd'
                  exact
                  activeClassName='active'
                  to='/admin/dashboard/addproduct'
                >
                  Add product
                </NavLink>
              </Nav.Link>
              <Nav.Link className='ml-2'>
                <NavLink
                  exact
                  activeClassName='active'
                  to='/admin/dashboard/products'
                >
                  products
                </NavLink>
              </Nav.Link>
              <Nav.Link className='ml-2'>
                <NavLink
                  exact
                  activeClassName='active'
                  to='/admin/dashboard/orderList'
                >
                  orders
                </NavLink>
              </Nav.Link>
              <Nav.Link className='ml-2'>
                <NavLink
                  exact
                  activeClassName='active'
                  to='/admin/dashboard/recipt'
                >
                  Recipt
                </NavLink>
              </Nav.Link>

              <Nav.Link className='ml-2'>
                <NavLink
                  exact
                  activeClassName='active'
                  to='/admin/dashboard/userDetails'
                >
                  user Details
                </NavLink>
              </Nav.Link>
              <Nav.Link className='ml-2'>
                <NavLink
                  exact
                  activeClassName='active'
                  to='/admin/dashboard/carrerApplications'
                >
                  carrer applications
                </NavLink>
              </Nav.Link>
            </Nav>
            <NavDropdown
              title={"Admin : " + this.state.adminName}
              className='m-3'
              id='collasible-nav-dropdown'
            >
              <NavDropdown.Item>
                <NavLink
                  exact
                  activeClassName='active'
                  to='/admin/dashboard/createNewAdmin'
                >
                  create Admin
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink
                  exact
                  activeClassName='active'
                  to='/admin/dashboard/settings'
                >
                  Settings
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink exact activeClassName='active' to='/Logout'>
                  Logout
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default adminNav;
