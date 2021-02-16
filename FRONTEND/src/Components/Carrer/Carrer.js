import React from "react";
import Nav from "../Navigation/Nav";
import { Redirect } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import swal from "sweetalert";
import Footer from "../Footer/Footer";
import axios from "axios";
class Carrer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      contact: "",
      emailid: "",
      address: "",
      qualification: "",
      jobExperience: "",
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      fname,
      lname,
      contact,
      emailId,
      address,
      qualification,
      jobExperience,
    } = this.state;
    const formDetails = {
      fname,
      lname,
      contact,
      emailId,
      address,
      qualification,
      jobExperience,
    };
    axios
      .post("http://localhost:5000/api/carrer/setCarrer", formDetails)
      .then(response =>
        swal(response.data.message).then(() => {
          this.setState({ redirect: true });
        })
      );
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  redirectto() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />;
    }
  }
  render() {
    return (
      <>
        {this.redirectto()}
        <Nav />
        <Container fluid className='LoginCon CarrerCon SignCon p-5'>
          <Container className='SubCon SignSubCon p-5 text-center'>
            <h1>Register of Job</h1>
            <Form onSubmit={this.onSubmit}>
              <div className='credentials mt-4'>
                <div className='box'>
                  <input
                    type='text'
                    name='fname'
                    required
                    onChange={this.onChange}
                  />
                  <span>FirstName</span>
                </div>
                <div className='box'>
                  <input
                    type='text'
                    name='lname'
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
                  <span>Contact</span>
                </div>

                <div className='box'>
                  <input
                    type='text'
                    name='emailId'
                    required
                    onChange={this.onChange}
                  />
                  <span>Email</span>
                </div>
                <div className='box'>
                  <textarea
                    type='text'
                    name='address'
                    required
                    className='p-3'
                    onChange={this.onChange}
                  />
                  <span>Address</span>
                </div>
                <div className='box'>
                  <textarea
                    type='text'
                    name='qualification'
                    className='p-3'
                    required
                    onChange={this.onChange}
                  />
                  <span>Qualification</span>
                </div>
                <div className='box'>
                  <Form.Control
                    as='select'
                    name='jobExperience'
                    className='selectDrop'
                    onChange={this.onChange}
                  >
                    <option>Experience</option>
                    <option value='Fresher'>Fresher</option>
                    <option value='1-4'>1-4</option>
                    <option value='4-6'>4-6</option>
                    <option value='6-10'>6-10</option>
                    <option value='above 10'>above 10</option>
                  </Form.Control>
                </div>
                <button type='submit' className='mt-3'>
                  Register
                </button>
              </div>
            </Form>
          </Container>
        </Container>
        <Footer />
      </>
    );
  }
}
export default Carrer;
