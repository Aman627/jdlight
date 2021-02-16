import React, { Component } from "react";
import Nav from "../../navbar/navbar";
import {
  Container,
  Collapse,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";

import axios from "axios";
class orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      emailId: "",
      orderId: "",
      status: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentDidMount() {
    this.getOrders();
  }
  onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/order/searchOrders", {
        emailId: this.state.emailId,
        orderId: this.state.orderId,
        status: this.state.status,
      })
      .then(response => {
        this.setState({
          orders: response.data.data,
        });
      });
  }
  onReset(e) {
    e.preventDefault();
    this.getOrders();
    document.getElementsByName("emailId").innerHTML = "";
    document.getElementsByName("orderId").innerHTML = "";
  }

  getOrders() {
    axios.get("http://localhost:5000/api/order/getOrders").then(response =>
      this.setState({
        orders: response.data.data,
      })
    );
  }
  shipOrder(orderId, emailId) {
    axios
      .patch(
        "http://localhost:5000/api/order/changeStatusToShipping/" +
          emailId +
          "&" +
          orderId
      )
      .then(response => {
        this.getOrders();
      })
      .catch();
  }
  completeOrder(orderId, emailId) {
    axios
      .patch(
        "http://localhost:5000/api/order/changeStatusToComplete/" +
          emailId +
          "&" +
          orderId
      )
      .then(response => {
        this.getOrders();
      })
      .catch();
  }
  cancelOrder(orderId) {
    axios
      .patch("http://localhost:5000/api/order/cancelOrder/" + orderId)
      .then(response => {
        this.getOrders();
      })
      .catch();
  }
  buttondecide(status, orderId, emailId) {
    if (status === "pending") {
      return (
        <div>
          <Button onClick={() => this.shipOrder(orderId, emailId)}>Ship</Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={() => this.cancelOrder(orderId)}>Cancel</Button>
        </div>
      );
    }
    if (status === "cancelled") {
      return <Button disabled>Order Canceled</Button>;
    }
    if (status === "completed") {
      return (
        <div>
          <Button disabled>Completed</Button>
        </div>
      );
    }
    if (status === "shipping") {
      return (
        <div>
          <Button onClick={() => this.cancelOrder(orderId, emailId)}>
            Cancel
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={() => this.completeOrder(orderId, emailId)}>
            Complete
          </Button>
        </div>
      );
    }
  }
  render() {
    const { orders } = this.state;

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
              placeholder='email Id'
              className='m-1'
              name='emailId'
              onChange={this.onChange}
            />
            <FormControl
              type='text'
              placeholder='order id'
              className='m-1'
              name='orderId'
              onChange={this.onChange}
            />
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Control
                as='select'
                className='m-1 '
                name='status'
                onChange={this.onChange}
              >
                <option value='pending'>pending</option>
                <option value='cancelled'>cancelled</option>
                <option value='shipping'>shipping</option>
                <option value='completed'>completed</option>
              </Form.Control>
            </Form.Group>
            <Button type='submit' className='m-1' variant='outline-info'>
              Search
            </Button>
            <Button
              type='reset'
              className='m-1 '
              onClick={this.onReset.bind(this)}
              variant='outline-info'
            >
              Reset
            </Button>
          </Form>
          {orders.length ? (
            orders.map(order => (
              <div
                key={order.orderId}
                className='Con d-flex flex-column justify-content-around m-1'
              >
                <button
                  className='CButton d-flex justify-content-between align-items-center text-center px-4 Playfair'
                  aria-controls='collapsetext'
                  aria-expanded={this.state.open}
                >
                  <div className='d-flex'>
                    <strong>Product Details</strong>
                  </div>
                  <h5>status:{order.status}</h5>
                  <h5>grandTotal:{order.grandTotal}</h5>
                  <div>
                    {this.buttondecide(
                      order.status,
                      order.orderId,
                      order.emailId
                    )}
                  </div>
                </button>
                <Collapse in='true'>
                  <div className='relatedc'>
                    <p className='Raleway'>
                      <strong>Client's Name:</strong>
                      {order.emailId}
                    </p>
                    <p className='Raleway'>
                      <strong>Shipping Address:</strong>
                      {order.address}
                    </p>
                    <p className='Raleway'>
                      <strong>Date of Order:</strong>
                      {order.date}
                    </p>
                    <p className='Raleway'>
                      <strong>Payment Method:</strong>
                      {order.paymentMethod}
                    </p>
                    <strong className='Raleway'>Product's Ordered:</strong>
                    {order.cart.map(val => (
                      <div className='d-flex flex-wrap tile p-3'>
                        <div
                          style={{ width: "200px" }}
                          className='d-flex flex-column'
                        >
                          <img
                            src={val.image}
                            alt='not found'
                            className='w-100'
                          />
                          <div className='text-center'>
                            <h6 className='m-0'>{val.name}</h6>
                          </div>
                          <div className='text-center'>
                            <h6>Quantity:{val.quantity}</h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            ))
          ) : (
            <span>
              <h1>"No Order Found"</h1>
            </span>
          )}
        </Container>
      </>
    );
  }
}

export default orders;
