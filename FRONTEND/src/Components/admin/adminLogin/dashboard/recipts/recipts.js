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
class recipts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipts: [],
      reciptId: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  componentDidMount() {
    this.getRecipt();
  }
  getRecipt() {
    axios.get("http://localhost:5000/api/recipt/getRecipt").then(response => {
      console.log(response.data.data);
      this.setState({ recipts: response.data.data });
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const { reciptId } = this.state;
    axios
      .post("http://localhost:5000/api/recipt/getReciptByReciptId", {
        reciptId,
      })
      .then(response => {
        console.log(response.data.data);
        this.setState({ recipts: response.data.data });
      });
  }
  onReset(e) {
    e.preventDefault();
    document.getElementById("reset").innerHTML = "";
    this.getRecipt();
  }
  render() {
    return (
      <>
        <Nav />
        <Container className='Raleway'>
          <Form
            inline
            onSubmit={this.onSubmit}
            className='d-flex justify-content-center m-2'
          >
            <FormControl
              type='text'
              placeholder='order Id'
              className='m-1'
              name='reciptId'
              id='reset'
              onChange={this.onChange}
            />

            <Button type='submit' className='m-1' variant='outline-info'>
              Search
            </Button>
            <Button
              type='reset'
              className='m-1'
              onReset={this.onReset}
              variant='outline-info'
            >
              Reset
            </Button>
          </Form>
          <Container fluid>
            <div className='my-4'>
              <h3 className='Raleway mb-2'>Recipts :-</h3>
              {this.state.recipts.map(user => (
                <div className='Raleway p-4 tile my-2' key={user.userId}>
                  {user.PaymentRecipt.map(details => (
                    <div>
                      <h3 className='text-success'>
                        <strong className='mr-2'>Payment Status:</strong>
                        {details.payload.payment.entity.captured
                          ? "Done"
                          : "failed"}
                      </h3>
                      <h5>
                        <strong className='mr-2'>Total Amount:</strong>
                        {details.payload.payment.entity.amount / 100}
                      </h5>
                      <h5>
                        <strong className='mr-2'>Contact:</strong>
                        {details.payload.payment.entity.contact}
                      </h5>
                      <h5>
                        <strong className='mr-2'>Email:</strong>
                        {details.payload.payment.entity.email}
                      </h5>
                      <h5>
                        <strong className='mr-2'>Total Amount:</strong>
                        {details.payload.payment.entity.amount / 100}
                      </h5>
                      <h5>
                        <strong className='mr-2'>OrderId:</strong>
                        {details.payload.payment.entity.order_id}
                      </h5>
                      <h5>
                        <strong className='mr-2'>ReciptId:</strong>
                        {details.payload.payment.entity.id}
                      </h5>
                    </div>
                  ))}
                  {/* orderId,reciptId,email ID, payment  failed or captured */}
                </div>
              ))}
            </div>
          </Container>
        </Container>
      </>
    );
  }
}

export default recipts;
