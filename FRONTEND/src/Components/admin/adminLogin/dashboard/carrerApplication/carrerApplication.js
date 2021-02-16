import React, { Component } from "react";
import Nav from "../../navbar/navbar";
import { Container } from "react-bootstrap";
import axios from "axios";
import "./carrerApplication.css";
class carrerApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carrers: [],
    };
  }

  componentDidMount() {
    this.getCarrers();
  }

  getCarrers() {
    axios.get("http://localhost:5000/api/carrer/getCarrer").then(response =>
      this.setState({
        carrers: response.data.data,
      })
    );
  }

  render() {
    const { carrers } = this.state;
    return (
      <>
        <Nav />
        <Container>
          <div className='my-4'>
            <h3 className='Raleway mb-2'>Applicants for Job/Carrers:-</h3>
            {carrers.length ? (
              carrers.map(carrer => (
                <div className='Raleway p-4 tile my-2' key={carrer.carrerId}>
                  <h4 className='text-success'>
                    <strong className='mr-2'>Applicant's Name:</strong>
                    {carrer.fname + " " + carrer.lname}
                  </h4>
                  <p className='my-2'>
                    <strong className='mr-2'>Address:</strong>
                    {carrer.address}
                  </p>
                  <p className='my-2'>
                    <strong>Qualification Details:</strong>
                    <br></br>
                    {carrer.qualification}
                  </p>
                  <h6 className='my-2'>
                    <strong className='mr-2'>Job Experience:</strong>
                    {carrer.jobExperience}
                  </h6>
                  <div className='d-flex'>
                    <strong className='mr-2'>Contact Details:</strong>
                    <p className='mr-3'>{carrer.emailId}</p>
                    <p>{carrer.contact}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h1 className='Raleway'>No carrer applications yet.</h1>
              </div>
            )}
          </div>
        </Container>
      </>
    );
  }
}

export default carrerApplication;
