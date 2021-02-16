import React from "react";
import Nav from "../Navigation/Nav";
import { Container, Collapse, Carousel } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ChevronDown, ChevronUp, Bag } from "react-bootstrap-icons/";
import swal from "sweetalert";
import "./Details.css";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      P_Details: [],
      UserName: localStorage.getItem("emailId"),
      qty: 1,
      open: true,
      openS: false,
      openO: false,
      renderLogin: false,
      span: "",
      Total: "Add Quantiy to see price",
    };
  }
  componentDidMount() {
    this.getProduct();
  }
  getProduct() {
    let url = this.props.location.search;
    let para = queryString.parse(url);
    let name = "";
    axios
      .get("http://localhost:5000/api/product/products/" + para.productId)
      .then(response => {
        response.data.products.map(product => (name = product.name));
        axios
          .get(
            "http://localhost:5000/api/cart/getIfProductInCart/" +
              this.state.UserName +
              "&" +
              name
          )
          .then(response => {
            if (response.data) {
              this.setState({
                span: "Already in cart",
              });
            } else {
              this.setState({
                span: "",
              });
            }
          });
        this.setState({
          P_Details: response.data.products,
        });
      })
      .catch(err => console.log(err));
  }
  changeRedirect() {
    if (this.state.UserName) {
      var image = "";
      var name = "";
      var price = "";
      const { UserName } = this.state;
      for (let i = 0; i < this.state.P_Details.length; i++) {
        image = this.state.P_Details[i].images[0];
        name = this.state.P_Details[i].name;
        price = this.state.P_Details[i].price;
      }
      var emailId = UserName;
      var quantity = document.getElementById("QtyV").value;

      var total = parseInt(price) * parseInt(quantity);
      this.setState({
        Total: total,
      });
      const cartdetails = {
        emailId,
        image,
        name,
        price,
        quantity,
        total,
      };

      axios
        .post("http://localhost:5000/api/cart/addtocart", cartdetails)
        .then(() =>
          this.setState({
            redirect: true,
          })
        )
        .catch(err => {
          console.error(err);
        });
    } else {
      swal("You are not logged  in!", "Please login to buy", "error").then(
        () => {
          this.setState({ renderLogin: true });
        }
      );
    }
  }
  plus(e) {
    let image = "";
    let name = "";
    let price = "";
    const { UserName } = this.state;
    for (let i = 0; i < this.state.P_Details.length; i++) {
      image = this.state.P_Details[i].images[0];
      name = this.state.P_Details[i].name;
      price = this.state.P_Details[i].price;
    }
    let emailId = UserName;
    let quantity = document.getElementById("QtyV").value;

    var total = parseInt(price) * (parseInt(quantity) + 1);
    this.setState({
      Total: total,
    });
    e.currentTarget.previousElementSibling.value = (
      parseInt(e.currentTarget.previousElementSibling.value) + 1
    ).toString();
    var qty = this.state.qty;
    this.setState({
      qty: qty + 1,
    });
  }
  minus(e) {
    var image = "";
    var name = "";
    var price = "";
    const { UserName } = this.state;
    for (let i = 0; i < this.state.P_Details.length; i++) {
      image = this.state.P_Details[i].images[0];
      name = this.state.P_Details[i].name;
      price = this.state.P_Details[i].price;
    }
    // var emailId = UserName;
    var quantity = document.getElementById("QtyV").value;
    var minO = "";
    for (let i = 0; i < this.state.P_Details.length; i++) {
      minO = this.state.P_Details[i].minOrder;
    }
    if (parseInt(e.currentTarget.nextElementSibling.value) !== parseInt(minO)) {
      e.currentTarget.nextElementSibling.value = (
        parseInt(e.currentTarget.nextElementSibling.value) - 1
      ).toString();
      var qty = this.state.qty;
      this.setState({
        qty: qty - 1,
      });
      var total = parseInt(price) * (parseInt(quantity) - 1);
      this.setState({
        Total: total,
      });
    }
  }
  setQty(e) {
    this.setState({
      qty: parseInt(e.target.value),
    });
  }
  showPD(e) {
    this.setState({
      open: !this.state.open,
      openS: false,
      openO: false,
    });
  }
  showPS(e) {
    this.setState({
      openS: !this.state.openS,
      open: false,
      openO: false,
    });
  }
  showPO(e) {
    this.setState({
      openO: !this.state.openO,
      open: false,
      openS: false,
    });
  }
  redirectto() {
    if (this.state.redirect === true) {
      return <Redirect to='/Cart' />;
    }
  }
  redirectLogin() {
    if (this.state.renderLogin) {
      return <Redirect to='/Login' />;
    }
  }
  render() {
    const { P_Details } = this.state;
    return (
      <>
        {this.redirectto()}
        {this.redirectLogin()}
        <Nav />
        <Container fluid>
          {P_Details.length ? (
            P_Details.map(product => (
              <Container
                fluid
                className='d-flex flex-column flex-lg-row justify-content-center'
              >
                <div className='DImage strip m-0 m-lg-5 my-3 text-center'>
                  <Carousel>
                    {product.images.map(image => (
                      <Carousel.Item interval={5000}>
                        <div key={image}>
                          <Image src={image} rounded />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
                <div className='DImage text-center'></div>
                <Container className='py-5'>
                  <h2 className='Raleway'>{product.name}</h2>

                  <h1>
                    <div className='Playfair'>
                      <strong>₹{product.price}/Piece</strong>
                    </div>
                  </h1>
                  <h5>TOtal Price will be:{this.state.Total}</h5>
                  <div className='qtydiv qtydetails d-flex '>
                    <h6 className='Playfair'>Quantity:</h6>
                    <div>
                      <button
                        name={product.productId}
                        onClick={this.minus.bind(this)}
                      >
                        -
                      </button>
                      <input
                        id='QtyV'
                        type='text'
                        defaultValue={product.minOrder}
                        onChange={this.setQty.bind(this)}
                      />
                      <button
                        name={product.productId}
                        onClick={this.plus.bind(this)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='mt-3 dvcol'>
                    <button
                      className='CButton d-flex justify-content-between align-items-center text-left px-4 Playfair'
                      onClick={this.showPD.bind(this)}
                      aria-controls='collapsetext'
                      aria-expanded={this.state.open}
                    >
                      <strong>Product Details</strong>
                      {this.state.open ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <Collapse in={this.state.open}>
                      <div className='relatedc'>
                        <div>
                          <h6>Minimum Order Quantity:</h6>
                          <p>{product.minOrder}</p>
                        </div>
                        <div>
                          <h6>Wattage:</h6>
                          <p>{product.Wattage}</p>
                        </div>
                        <div>
                          <h6>Color Temperature:</h6>
                          <p>{product.color}</p>
                        </div>
                        <div>
                          <h6>Input Voltage:</h6>
                          <p>{product.inputVoltage}</p>
                        </div>
                        <div>
                          <h6>Power:</h6>
                          <p>{product.power}</p>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                  <div className='dvcol'>
                    <button
                      className='CButton d-flex justify-content-between align-items-center text-left px-4 Playfair'
                      onClick={this.showPS.bind(this)}
                      aria-controls='collapsetext'
                      aria-expanded={this.state.openS}
                    >
                      <strong>Specification</strong>
                      {this.state.openS ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <Collapse in={this.state.openS}>
                      <div className='relatedc'>
                        <div>
                          <h6>LED:</h6>
                          <p>{product.led}</p>
                        </div>
                        <div>
                          <h6>Body:</h6>
                          <p>{product.body}</p>
                        </div>
                        <div>
                          <h6>Cap:</h6>
                          <p>{product.cap}</p>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                  <div className='dvcol'>
                    <button
                      className='CButton d-flex justify-content-between align-items-center text-left px-4 Playfair'
                      onClick={this.showPO.bind(this)}
                      aria-controls='collapsetext'
                      aria-expanded={this.state.openO}
                    >
                      <strong>Description</strong>
                      {this.state.openO ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <Collapse in={this.state.openO}>
                      <div className='relatedc'>
                        <p>{product.description}</p>
                      </div>
                    </Collapse>
                  </div>
                  {this.state.span ? (
                    <h3 className='text-success p-5'>{this.state.span}</h3>
                  ) : (
                    <div className='Call mt-5'>
                      <button onClick={this.changeRedirect.bind(this)}>
                        <Bag />
                        &nbsp;&nbsp;Buy now
                      </button>
                    </div>
                  )}
                </Container>
              </Container>
            ))
          ) : (
            <h1>Searching...</h1>
          )}
        </Container>
      </>
    );
  }
}

export default Details;
