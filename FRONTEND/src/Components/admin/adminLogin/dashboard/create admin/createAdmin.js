import React, { Component } from "react";
import Nav from "../../navbar/navbar";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

class createNewAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admins: [],
      adminName: "",
      adminPassword: "",
      adminPasswordCheck: "",
      span: "",
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.getAllAdmins();
  }
  getAllAdmins = () => {
    axios
      .get("http://localhost:5000/api/admin/getAllAdmin")
      .then(response => {
        console.log(response.data.data);
        this.setState({
          admins: response.data.data,
        });
      })
      .catch(response => {});
  };

  deleteAdmin(adminId) {
    axios
      .delete("http://localhost:5000/api/admin/deleteAdmin/" + adminId)
      .then(response => {
        this.setState({
          span: response.data.message,
        });
        this.getAllAdmins();
      })
      .catch(response =>
        this.setState({
          span: "cant delete at moment",
        })
      );
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
    let adminPasswordCheck = this.state.adminPasswordCheck;
    if (adminPassword !== adminPasswordCheck) {
      return this.setState({
        span: "plzZ  match both password",
      });
    }
    const adminDetails = {
      adminName,
      adminPassword,
    };
    axios
      .post("http://localhost:5000/api/admin/signUp", adminDetails)
      .then(response => {
        if (response.data) {
          this.setState({
            span: "Admin created",
          });
          this.getAllAdmins();
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
  render() {
    const { admins } = this.state;
    return (
      <>
        <Nav />
        <Container className=' Raleway p-5'>
          <Form
            className='h-100 w-50 m-auto  text-center d-flex flex-column justify-content-center'
            onSubmit={this.onSubmit}
          >
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
            <Form.Group controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='reenter Password'
                name='adminPasswordCheck'
                required
                onChange={this.onChange}
              />
            </Form.Group>
            <span className='m-3 text-danger'>{this.state.span}</span>
            <Button variant='dark' type='submit'>
              Submit
            </Button>
          </Form>

          <div className='mt-4'>
            <h3 className=' mb-2'>Registered Admins:-</h3>
            {admins.length
              ? admins.map(admin => (
                  <div
                    className=' p-4 tile my-2 d-flex justify-content-between'
                    key={admin.adminId}
                  >
                    <h4 className='text-success'>
                      <strong className='mr-2'>Admin's Name:</strong>
                      {admin.adminName}
                    </h4>
                    <Button
                      variant='danger'
                      onClick={() => this.deleteAdmin(admin.adminId)}
                    >
                      delete
                    </Button>
                  </div>
                ))
              : null}
          </div>
        </Container>
      </>
    );
  }
}

export default createNewAdmin;
