import React, { Component } from "react";
import Nav from "../../navbar/navbar";
import axios from "axios";
import {
  Container,
  Collapse,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
class settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otherCharges: "",
      mobileNumber: "",
      address: "",
      emailId: "",
      facebookLink: "",
      igLink: "",
      twitterLink: "",
      span: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitotherCharges = this.onSubmitotherCharges.bind(this);
  }
  componentDidMount() {
    this.getotherCharges();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  getotherCharges() {
    axios.get("http://localhost:5000/api/extra/getExtra").then(response => {
      console.log(response.data.data);
      response.data.data.map(val =>
        this.setState({
          otherCharges: val.otherCharges,
          mobileNumber: val.mobileNumber,
          emailId: val.emailId,
          address: val.address,
          facebookLink: val.facebookLink,
          igLink: val.igLink,
          twitterLink: val.twitterLink,
        })
      );
    });
  }
  onSubmitotherCharges(e) {
    e.preventDefault();
    const {
      otherCharges,
      mobileNumber,
      emailId,
      address,
      facebookLink,
      igLink,
      twitterLink,
    } = this.state;
    axios
      .patch("http://localhost:5000/api/extra/patchExtra", {
        otherCharges,
        mobileNumber,
        emailId,
        address,
        facebookLink,
        igLink,
        twitterLink,
      })
      .then(response => {
        this.setState({ span: "Updated" });
      });
    this.getotherCharges();
  }
  onSubmit(e) {
    e.preventDefault();
    const {
      otherCharges,
      mobileNumber,
      emailId,
      address,
      facebookLink,
      igLink,
      twitterLink,
    } = this.state;
    axios
      .patch("http://localhost:5000/api/extra/patchExtra", {
        otherCharges,
        mobileNumber,
        emailId,
        address,
        facebookLink,
        igLink,
        twitterLink,
      })
      .then(response => {
        this.setState({ span: "Updated" });
      });
    this.getotherCharges();
  }
  render() {
    return (
      <>
        <Nav />
        <Container className='Raleway p-5'>
          <span>{this.state.span}</span>
          <Form
            onSubmit={this.onSubmitotherCharges}
            className='h-100 w-50 m-auto  text-center d-flex flex-column justify-content-center'
          >
            <Form.Group>
              <FormControl
                type='text'
                placeholder={this.state.otherCharges}
                name='otherCharges'
                onChange={this.onChange}
              />
            </Form.Group>

            <Button type='submit' className='my-2' variant='dark'>
              Update Other Charges
            </Button>
          </Form>
          <Form
            onSubmit={this.onSubmit}
            className='h-100 w-50 m-auto  text-center d-flex flex-column justify-content-center'
          >
            <Form.Group>
              <FormControl
                type='text'
                placeholder={this.state.mobileNumber}
                name='mobileNumber'
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group>
              <FormControl
                type='text'
                placeholder={this.state.emailId}
                name='emailId'
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group>
              <FormControl
                type='text'
                placeholder={this.state.address}
                name='address'
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group>
              <FormControl
                type='text'
                placeholder={this.state.facebookLink}
                name='facebookLink'
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group>
              <FormControl
                type='text'
                placeholder={this.state.igLink}
                name='igLink'
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group>
              <FormControl
                type='text'
                placeholder={this.state.twitterLink}
                name='twitterLink'
                onChange={this.onChange}
              />
            </Form.Group>

            <Button type='submit' className='my-2' variant='dark'>
              Update
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default settings;
