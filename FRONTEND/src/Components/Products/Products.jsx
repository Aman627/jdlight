import React from "react";
import Nav from "../Navigation/Nav";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";

import axios from "axios";
import queryString from "query-string";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      category: [],
    };
  }
  componentDidMount() {
    let url = this.props.location.search;
    let para = queryString.parse(url);
    axios
      .get("http://localhost:5000/api/product/getProductByCategory/" + para.Cat)
      .then(response => {
        this.setState({
          Products: response.data.data,
        });
      })
      .catch(err => console.log(err));
    axios
      .get("http://localhost:5000/api/product/getCategory")
      .then(response => {
        this.setState({
          category: response.data.data,
        });
      });
  }

  getProductByCategory(e) {
    axios
      .get(
        "http://localhost:5000/api/product/getProductByCategory/" +
          e.target.name
      )
      .then(response => {
        this.setState({
          Products: response.data.data,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { Products } = this.state;

    return (
      <>
        <Nav />
        <Container fluid>
          <Container
            fluid
            className='mx-2 mt-3 d-flex justify-content-between align-items-center'
          >
            <h1 className='Raleway'>Products</h1>
            <DropdownButton
              key='left'
              id='dropdown-button-drop-left'
              drop='left'
              variant='secondary'
              title='Filter'
              className='mr-3'
            >
              <Dropdown.Item className='text-white Raleway'>
                <Button
                  onClick={this.getProductByCategory.bind(this)}
                  name='All'
                >
                  All
                </Button>
              </Dropdown.Item>
              {this.state.category.map(val => (
                <Dropdown.Item className='text-white Raleway'>
                  <Button
                    onClick={this.getProductByCategory.bind(this)}
                    name={val}
                  >
                    {val}
                  </Button>
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Container>
          <h6 className='mx-4 my-1 Playfair'>Category:{this.state.category}</h6>
          <div className='d-flex flex-wrap justify-content-center'>
            {Products.map(product => {
              return (
                <Link
                  exact
                  className='m-3'
                  to={`/Details?productId=${product.productId}`}
                >
                  <Card style={{ width: "18rem" }}>
                    <div className='Cardimg'>
                      <Card.Img variant='top' src={product.images[0]} />
                    </div>
                    <Card.Body className='bg-dark text-white Raleway'>
                      <Card.Title>
                        <strong>{product.name}</strong>
                      </Card.Title>
                      <Card.Text className='Playfair'>
                        ₹{product.price}/Piece
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
export default Products;
