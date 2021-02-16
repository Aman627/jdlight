import axios from "axios";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Nav from "../../navbar/navbar";
import "../carrerApplication/carrerApplication.css";

class userDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    axios.get("http://localhost:5000/api/user/users").then(response => {
      console.log(response.data.data);
      this.setState({
        users: response.data.data,
      });
    });
  }
  render() {
    const { users } = this.state;
    return (
      <>
        <Nav />
        <Container>
          <div className='my-4'>
            <h3 className='Raleway mb-2'>Registered Users:-</h3>
            {users.map(user => (
              <div className='Raleway p-4 tile my-2' key={user.userId}>
                <h4 className='text-success'>
                  <strong className='mr-2'>User's Name:</strong>
                  {user.firstName + " " + user.lastName}
                </h4>
                <p className='my-2'>
                  <strong className='mr-2'>Address:</strong>
                  {user.address}
                </p>
                <div className='d-flex'>
                  <strong className='mr-2'>Contact Details:</strong>
                  <p className='mr-3'>{user.emailId}</p>
                  <p>{user.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </>
    );
  }
}

export default userDetails;
