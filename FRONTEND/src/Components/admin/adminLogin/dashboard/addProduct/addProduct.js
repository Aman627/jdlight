import React, { Component } from "react";
import Nav from "../../navbar/navbar";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

class addProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      staticCategory: [],
      name: "",
      price: "",
      images: null,
      minOrder: "",
      Wattage: "",
      color: "",
      inputVoltage: "",
      power: "",
      led: "",
      body: "",
      cap: "",
      category: "",
      description: "",
      span: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    // this.getProduct();
    this.getCategory();
  }
  getProduct() {
    axios.get("http://localhost:5000/api/product/products").then(response => {
      this.setState({
        products: response.data.products,
      });
    });
  }
  getCategory() {
    axios
      .get("http://localhost:5000/api/product/getCategory")
      .then(response => {
        this.setState({
          staticCategory: response.data.data,
        });
        this.getCategory();
      });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChangeFile(e) {
    this.setState({
      [e.target.name]: e.target.files,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    for (const key of Object.keys(this.state.images)) {
      formData.append("images", this.state.images[key]);
    }
    formData.append("minOrder", this.state.minOrder);
    formData.append("Wattage", this.state.Wattage);
    formData.append("color", this.state.color);
    formData.append("inputVoltage", this.state.inputVoltage);
    formData.append("power", this.state.power);
    formData.append("led", this.state.led);
    formData.append("body", this.state.body);
    formData.append("cap", this.state.cap);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);

    axios({
      method: "post",
      url: "http://localhost:5000/api/product/createProduct",
      data: formData,
    })
      .then(response => {
        this.setState({
          span: response.data.message,
        });
        this.getCategory();
      })
      .catch(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <>
        <Nav />
        <Container className=' Raleway p-3'>
          <Form onSubmit={this.onSubmit}>
            <div className='d-flex flex-wrap'>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Product Name'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='price'
                  placeholder='price'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='minOrder'
                  placeholder='minmum Order'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='Wattage'
                  placeholder='Wattage'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='color'
                  placeholder='color theme'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='inputVoltage'
                  placeholder='Input Voltage'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='power'
                  placeholder='power'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='led'
                  placeholder='LED'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='body'
                  placeholder='body'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='cap'
                  placeholder='Cap'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  as='textarea'
                  col='1'
                  type='text'
                  name='description'
                  placeholder='description'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.Control
                  type='text'
                  name='category'
                  placeholder='category'
                  required
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='m-1'>
                <Form.File
                  type='file'
                  custom
                  accept='.jpeg, .png, .jpg, .tiff'
                  id='custom-file'
                  label='Choose images'
                  name='images'
                  required
                  multiple
                  onChange={this.onChangeFile}
                />
              </Form.Group>
              <h3 className='m-3 text-success'>
                <span>{this.state.span}</span>
              </h3>
            </div>
            <Button
              className='flex-column m-auto text-center justify-content-center'
              variant='dark'
              type='submit'
            >
              Add product
            </Button>
          </Form>
          <div className='mt-4'>
            <h3 className='Raleway mb-2'>Category You already have:</h3>
            {this.state.staticCategory.map(category => (
              <div
                className='Raleway p-4 tile my-2 d-flex justify-content-between'
                key={category}
              >
                <h3 className='text-success'>
                  <strong className='mr-2'>{category}</strong>
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </>
    );
  }
}

export default addProduct;
