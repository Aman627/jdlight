import React from "react";
import Nav from "../Navigation/Nav";
import { NavLink, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Footer from "../Footer/Footer";
import LoggedUser from "../LoggedUser/LoggedUser";
import "./Login.css";
import axios from "axios";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      span: "",
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handelInput(e) {
    const value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (emailRegex.test(value)) {
      e.target.classList.add("valid");
      e.target.classList.remove("invalid");
    } else {
      e.target.classList.add("invalid");
      e.target.classList.remove("valid");
    }
    if (!value) {
      e.target.classList.remove("invalid");
    }
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let emailId = this.state.emailId;
    let password = this.state.password;
    const userDetails = {
      emailId,
      password,
    };
    axios
      .post("http://localhost:5000/api/user/login", userDetails)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("emailId", response.data.emailId);
          localStorage.setItem("token", response.data.token);
          this.setState({
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
    LoggedUser.setName(this.state.name);
    LoggedUser.setId(this.state.UID);
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
  }
  render() {
    return (
      <>
        {this.renderRedirect()}
        <Nav />
        <Container fluid className='LoginCon p-5'>
          <Container className='SubCon p-5 text-center'>
            <h1>Login</h1>
            <form onSubmit={this.onSubmit}>
              <div className='credentials mt-5'>
                <div className='box'>
                  <input
                    type='email'
                    name='emailId'
                    required
                    onInput={this.handelInput.bind(this)}
                    onChange={this.onChange}
                  />
                  <span>Email</span>
                </div>
                <div className='box'>
                  <input
                    type='password'
                    name='password'
                    required
                    onChange={this.onChange}
                  />
                  <span>Password</span>
                </div>
                <h6 className='text-danger'>{this.state.span}</h6>
                <button type='submit' className='mt-3'>
                  Login
                </button>
              </div>
            </form>
            <div className='reglink mt-3'>
              <strong>
                New Here?{" "}
                <NavLink className='Redirect' exact to='/SignUp'>
                  SignUp Here
                </NavLink>
              </strong>
            </div>
          </Container>
        </Container>
        <Footer />
      </>
    );
  }
}
export default Login;
