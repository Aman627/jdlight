import React from "react";
import Nav from "../Navigation/Nav";
import { NavLink, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Footer from "../Footer/Footer";
import "../Login/Login.css";
import swal from "sweetalert";
import axios from "axios";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      contact: "",
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
    const emailIdRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (emailIdRegex.test(value)) {
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
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var contact = this.state.contact;
    var emailId = this.state.emailId;
    var password = this.state.password;
    const userdetails = {
      firstName,
      lastName,
      contact,
      emailId,
      password,
    };
    axios
      .post("http://localhost:5000/api/user/signUp", userdetails)
      .then(response => {
        if (response.data.success === 0) {
          this.setState({ span: response.data.message });
        }
        if (response.data.success === 1) {
          swal("Registered successfully").then(() => {
            this.setState({ redirect: true });
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/Login' />;
    }
  }
  render() {
    return (
      <>
        {this.renderRedirect()}
        <Nav />
        <Container fluid className='LoginCon SignCon p-5'>
          <Container className='SubCon SignSubCon p-5 text-center'>
            <h1>Register</h1>
            <form action='' onSubmit={this.onSubmit}>
              <div className='credentials mt-4'>
                <div className='box'>
                  <input
                    type='text'
                    name='firstName'
                    required
                    onChange={this.onChange}
                  />
                  <span>FirstName</span>
                </div>
                <div className='box'>
                  <input
                    type='text'
                    name='lastName'
                    required
                    onChange={this.onChange}
                  />
                  <span>LastName</span>
                </div>
                <div className='box'>
                  <input
                    type='text'
                    name='contact'
                    required
                    onChange={this.onChange}
                  />
                  <span>contact</span>
                </div>
                <div className='box'>
                  <input
                    type='email'
                    name='emailId'
                    required
                    onInput={this.handelInput.bind(this)}
                    onChange={this.onChange}
                  />
                  <span>emailId</span>
                </div>
                <div className='box'>
                  <input
                    type='password'
                    name='password'
                    required
                    onChange={this.onChange}
                  />
                  <span>password</span>
                </div>
                <h6 className='text-danger'>{this.state.span}</h6>
                <button type='submit' className='mt-3'>
                  Register
                </button>
              </div>
            </form>
            <div className='reglink'>
              <strong>
                Already Have Account?{" "}
                <NavLink className='Redirect' exact to='/Login'>
                  Login Here
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
export default SignUp;
