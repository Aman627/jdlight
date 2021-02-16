import React from "react";
import Nav from "../../Navigation/Nav";
import { Container, Collapse } from "react-bootstrap";
import axios from "axios";
class MyOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      span: "",
      UserName: localStorage.getItem("emailId"),
    };
  }
  componentDidMount() {
    this.getOrders();
  }
  showPD(e) {
    this.setState({
      open: !this.state.open,
      openS: false,
      openO: false,
    });
  }
  getOrders() {
    axios
      .get(
        "http://localhost:5000/api/order/getOrdersByEmail/" +
          this.state.UserName
      )
      .then(response => {
        this.setState({
          orders: response.data.data,
        });
      });
  }
  // cancelOrder(orderId) {
  //   axios
  //     .patch("http://localhost:5000/api/order/cancelOrder/" + orderId)
  //     .then(response => {
  //       this.getOrders();
  //     })
  //     .catch();
  // }
  render() {
    const { orders } = this.state;
    return (
      <>
        <Nav />
        <Container>
          <h5 className='text-warning p-3 bg-dark mt-3 m-1'>
            If you want to cancel any of ongoing order contact us at:8850412154
          </h5>
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
                  {/* <button onClick={() => this.cancelOrder(order.orderId)}>
                    Cancel
                  </button> */}
                </button>
                <Collapse in='true'>
                  <div className='relatedc'>
                    {order.cart.map(val => (
                      <div className='d-flex'>
                        <div
                          style={{ width: "200px" }}
                          className='d-flex flex-column'
                        >
                          <img
                            src={val.image}
                            alt='not found'
                            className='w-100'
                          />
                          <div>
                            <h6 className='m-0'>{val.name}</h6>
                          </div>
                          <div>
                            <h6>Quantity:{val.quantity}</h6>
                          </div>
                          <div>
                            <h6>Address:{order.address}</h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            ))
          ) : (
            <span
              style={{ height: "80vh" }}
              className='m-10 d-flex flex-column justify-content-center text-center'
            >
              <h3 className='Raleway'>No order Found</h3>
            </span>
          )}
        </Container>
      </>
    );
  }
}

export default MyOrder;
