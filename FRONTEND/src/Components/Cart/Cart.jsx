import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import Nav from "../Navigation/Nav";
import { Form, Button, Container } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import swal from "sweetalert";
import axios from "axios";
import AlternateImage from "../Images/undraw_lightbulb_moment_evxr.png";

import "./Cart.css";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      UserName: localStorage.getItem("emailId"),
      contact: "",
      name: "",
      subtotal: "",
      carttotal: "",
      othercharges: "250",
      grandtotal: "",
      address: "",
      paymentMethod: "",
      span: "",
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.getCart();
    this.getUserData();
  }
  getUserData() {
    // axios
    //   .get("http://localhost:5000/api/user/users/" + this.state.UserName)
    //   .then(response => {
    //     this.setState({
    //       name:
    //         response.data.data.firstName + " " + response.data.data.lastName,
    //       contact: response.data.data.contact,
    //     });
    //   });
  }
  getCart() {
    axios
      .get(
        "http://localhost:5000/api/cart/getCartOfUser/" + this.state.UserName
      )
      .then(response => {
        if (response.data) {
          this.setState({
            cart: response.data.data,
          });
          const totalOfCart = this.state.cart.map(val => parseInt(val.total));
          let subtotal = totalOfCart.reduce((acc, cv) => {
            return acc + cv;
          }, 0);
          this.setState({
            subtotal: subtotal,
          });
        }
        if (response.data.data === 0) {
          this.setState({
            span: response.data.message,
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleminus(e) {
    var cart1 = this.state.cart;
    if (parseInt(e.currentTarget.nextElementSibling.innerHTML) !== 0) {
      e.currentTarget.nextElementSibling.innerHTML = (
        parseInt(e.currentTarget.nextElementSibling.innerHTML) - 1
      ).toString();
      var index = e.target.name;
      for (var i = 0; i < cart1.length; i++) {
        var item = cart1[i];
        if (item.ItemID === index) {
          item.Qty = e.currentTarget.nextElementSibling.innerHTML;
        }
        cart1[i] = item;
        this.setState({ cart: cart1 });
      }
      var cartt = 0;
      for (var j = 0; j < cart1.length; j++) {
        var items = cart1[j];
        cartt += items.Price * items.Qty;
      }
      this.setState({ carttotal: cartt });
    }
  }
  handleplus(e) {
    var cart2 = this.state.cart;
    e.currentTarget.previousElementSibling.innerHTML = (
      parseInt(e.currentTarget.previousElementSibling.innerHTML) + 1
    ).toString();
    var index = e.target.name;
    for (var i = 0; i < cart2.length; i++) {
      var item = cart2[i];
      if (item.ItemID === index) {
        item.Qty = e.currentTarget.previousElementSibling.innerHTML;
      }
      cart2[i] = item;
      this.setState({ cart: cart2 });
    }
    var cartt = 0;
    for (var j = 0; j < cart2.length; j++) {
      var items = cart2[j];
      cartt += items.Price * items.Qty;
    }
    this.setState({ carttotal: cartt });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  loadScript = src => {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  displayRazorpay = async () => {
    if (this.state.paymentMethod === "card") {
      const res = await this.loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const data = await axios.post(
        "http://localhost:5000/api/order/createOrder",
        {
          emailId: this.state.UserName,
          paymentMethod: this.state.paymentMethod,
          address: this.state.address,
        }
      );
      const options = {
        key: "rzp_test_brndJrJYu0ukPF",
        currency: data.data.currency,
        amount: data.data.amount.toString(),
        order_id: data.data.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.UserName,
        handler: function (response) {
          console.log(response);
          axios
            .post("http://localhost:5000/api/order/createCardOrder", {
              emailId: this.state.UserName,
              paymentMethod: this.state.paymentMethod,
              address: this.state.address,
              orderId: response.razorpay_order_id,
            })
            .then(() => {
              //clear cart
              axios
                .delete(
                  "http://localhost:5000/api/cart/deleteEntierCartByEmail/" +
                    this.state.UserName
                )
                .then(() => {
                  swal("Order successfully").then(() => {
                    this.setState({ redirect: true });
                  });
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }.bind(this),
        prefill: {
          name: this.state.name,
          email: this.state.UserName,
          phone_number: this.state.contact,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        swal("Order failed");
      });
      paymentObject.open();
    } else {
      axios
        .post("http://localhost:5000/api/order/createOrder", {
          emailId: this.state.UserName,
          paymentMethod: this.state.paymentMethod,
          address: this.state.address,
        })
        .then(response => {
          //clear cart
          axios
            .delete(
              "http://localhost:5000/api/cart/deleteEntierCartByEmail/" +
                this.state.UserName
            )
            .then(() => {
              swal("Order successfully").then(() => {
                this.setState({ redirect: true });
              });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };
  onSubmit(e) {
    e.preventDefault();
    this.displayRazorpay();
  }

  deleteCartItem(cartId) {
    axios
      .delete("http://localhost:5000/api/cart/DeleteFromCart/" + cartId)
      .then(() => this.getCart())
      .catch(err => {
        console.error(err);
      });
  }
  redirectto() {
    if (this.state.redirect === true) {
      return <Redirect to='/MyOrder' />;
    }
  }
  render() {
    var { cart } = this.state;

    return (
      <>
        {this.redirectto()}
        <Nav />
        <Container fluid className='py-3 text-center'>
          <Container fluid>
            {cart.length ? (
              cart.map(val => (
                <div
                  key={val.cartId}
                  className='Con d-flex flex-column flex-md-row justify-content-around'
                >
                  <div className='d-flex flex-column flex-lg-row'>
                    <div className='CImage text-center text-lg-left '>
                      <img src={val.image} alt='' />
                    </div>
                    <div className='pt-3 pl-2 text-center text-lg-left CID'>
                      <h5 className='Raleway'>{val.name}</h5>
                    </div>
                  </div>
                  <div className='pt-3 pl-2 text-center text-lg-left'>
                    <strong className='Raleway'>
                      Price Per Piece:₹
                      <span className='CPrice'>{val.price}</span>
                    </strong>
                  </div>
                  <div className='pt-3 pl-2 text-center text-lg-left Cqtydetails cqty'>
                    <h6
                      style={{ paddingBottom: "3px" }}
                      className='text-center'
                    >
                      Quantity:
                      <span className='CQty'>{val.quantity}</span>
                    </h6>
                  </div>
                  <div className='pt-3 pl-2 text-lg-left text-center'>
                    <strong className='Raleway'>Total: ₹ {val.total}</strong>
                  </div>
                  <div className='pt-3 pl-2 text-center text-lg-left delete '>
                    <h5>
                      <button
                        className='text-danger'
                        onClick={() => this.deleteCartItem(val.cartId)}
                      >
                        <Trash />
                      </button>
                    </h5>
                  </div>
                </div>
              ))
            ) : (
              <span>{this.state.span}</span>
            )}
          </Container>
          {cart.length ? (
            <Container fluid>
              <div className='my-3 p-3 Con text-center text-lg-left'>
                <h4 className='pb-2 Raleway border-bottom'>Cart summary</h4>
                <Container fluid>
                  <div className='d-flex justify-content-between py-1 Raleway'>
                    <strong>Subtotal:</strong>
                    <strong>₹{this.state.subtotal}</strong>
                  </div>
                  <div className='d-flex justify-content-between py-1 Raleway'>
                    <strong>Other charges:</strong>
                    <strong>₹{this.state.othercharges}</strong>
                  </div>
                  <div className='d-flex justify-content-between py-1 Raleway'>
                    <strong>Grand Total:</strong>
                    <strong>
                      ₹
                      {
                        (this.state.grandtotal =
                          this.state.subtotal +
                          parseInt(this.state.othercharges))
                      }
                    </strong>
                  </div>

                  <div className='Raleway text-left'>
                    <strong>Shipping:</strong>
                    <Form
                      onSubmit={this.onSubmit}
                      className='border p-3 my-3 rounded form'
                    >
                      <Form.Group controlId='formBasicPassword'>
                        <Form.Label>
                          <strong>Address</strong>
                        </Form.Label>
                        <Form.Control
                          required
                          as='textarea'
                          onChange={this.onChange}
                          name='address'
                          placeholder='Complete Address'
                        />
                      </Form.Group>

                      <div className='pb-3'>
                        <Form.Label>
                          <strong>Payment</strong>
                        </Form.Label>

                        <Form.Check
                          required
                          type='radio'
                          aria-label='radio 1'
                          label='COD'
                          name='paymentMethod'
                          value='COD'
                          onChange={this.onChange}
                        ></Form.Check>
                        <Form.Check
                          required
                          type='radio'
                          aria-label='radio 1'
                          label='debit card/ credit card/ wallet'
                          name='paymentMethod'
                          value='card'
                          onChange={this.onChange}

                          // onClick={this.displayRazorpay}
                        ></Form.Check>
                      </div>
                      <div className='d-flex justify-content-center finalButtons'>
                        <NavLink to='Products?Cat=All'>
                          <Button
                            className='Raleway'
                            variant='dark'
                            type='submit'
                          >
                            Keep Shopping
                          </Button>
                        </NavLink>
                        <Button className='Raleway primary ml-5' type='submit'>
                          Checkout
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Container>
              </div>
            </Container>
          ) : (
            <Container className='Raleway'>
              <div>
                <img src={AlternateImage} style={{ maxWidth: "300px" }} />
                <p>Sorry! we didn't found any items in your cart</p>
              </div>
              <NavLink to='Products?Cat=All'>
                <Button className='Raleway' variant='dark' type='submit'>
                  Keep Shopping
                </Button>
              </NavLink>
            </Container>
          )}
        </Container>
      </>
    );
  }
}

export default Cart;
