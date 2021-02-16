import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Nav from "../navbar/navbar";

class dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminName: localStorage.getItem("adminName"),
    };
  }

  render() {
    return (
      <>
        <Nav />
        <Container>
          <div className='Raleway m-3'>
            <center>
              <h1 className=' mb-2'>Welcome {this.state.adminName}</h1>
            </center>
          </div>
        </Container>
      </>
    );
  }
}

export default dashboard;
