import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
class adminLogin extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("admintoken");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false;
    }
    this.state = {
      adminName: "",
      adminPassword: "",
      span: "",
      redirect: false,
      loggedIn,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let adminName = this.state.adminName;
    let adminPassword = this.state.adminPassword;
    const adminDetails = {
      adminName,
      adminPassword,
    };
    axios
      .post("http://localhost:5000/api/admin/login", adminDetails)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("admintoken", response.data.token);
          localStorage.setItem("adminName", this.state.adminName);
          this.setState({
            loggedIn: true,
            redirect: true,
          });
        } else {
          this.setState({
            span: response.data.message,
          });
        }
      })
      .catch(response => {
        console.log(response);
      });
  }
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/admin/dashboard' />;
    }
  }
  render() {
    if (this.state.loggedIn) return <Redirect exact to='/admin/dashboard' />;
    return (
      <>
        {this.renderRedirect()}
        <Container style={{ height: "100vh" }} className='text-center Raleway'>
          <Form
            className='h-100 w-50 m-auto  text-center d-flex flex-column justify-content-center'
            onSubmit={this.onSubmit}
          >
            <h4 className='m-4'>Admin</h4>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='Enter user'
                required
                name='adminName'
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                name='adminPassword'
                required
                onChange={this.onChange}
              />
            </Form.Group>
            <span className='m-3 text-danger'>{this.state.span}</span>
            <Button variant='dark' type='submit'>
              Login
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default adminLogin;
