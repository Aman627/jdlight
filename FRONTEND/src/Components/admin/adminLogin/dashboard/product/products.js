import axios from "axios";
import React, { Component } from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import Nav from "../../navbar/navbar";
import { Trash } from "react-bootstrap-icons";

class products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  deleteProduct(productId, name) {
    axios
      .delete(
        "http://localhost:5000/api/product/products/" + productId + "&" + name
      )
      .then(response => {
        this.setState({
          span: response.data.message,
        });
        this.getProducts();
      })
      .catch(response =>
        this.setState({
          span: "cant delete at moment",
        })
      );
  }

  getProducts = () => {
    axios
      .get("http://localhost:5000/api/product/products")
      .then(response => {
        console.log(response.data.products);
        this.setState({
          products: response.data.products,
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { products } = this.state;
    products.map(product => console.log(product.images));
    return (
      <>
        <Nav />
        <Container fluid className='p-0 py-5 Raleway'>
          <h3 className='Raleway py-2 px-5'>
            <strong>Products:-</strong>
          </h3>
          <div className=''>
            {products.length
              ? products.map(product => (
                  <div
                    className=' d-flex flex-wrap w-100 tile p-3 justify-content-between'
                    key={product.productId}
                  >
                    <div className='d-flex flex-wrap'>
                      <div style={{ maxWidth: "400px" }}>
                        <Carousel style={{ height: "300px" }}>
                          {product.images.map(image => (
                            <div key={image}>
                              <Carousel.Item>
                                <img
                                  className='w-100'
                                  alt='not found'
                                  src={image}
                                  rounded
                                />
                              </Carousel.Item>
                            </div>
                          ))}
                        </Carousel>
                        <h4 className='text-success mt-2'>
                          <strong className='mr-2'>Product's Name:</strong>
                          {product.name}
                        </h4>
                        <h5>
                          <strong>Price:{product.price}</strong>
                        </h5>
                      </div>
                      <div className='p-3 d-flex flex-column flex-lg-row justify-content-between'>
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
                        <div className='relatedc'>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      className='text-danger '
                      onClick={() =>
                        this.deleteProduct(product.productId, product.name)
                      }
                      variant='none'
                    >
                      <Trash />
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

export default products;
