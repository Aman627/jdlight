import React from "react";
import Nav from "../Navigation/Nav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Person from "../Images/Person.jpg";
import Person2 from "../Images/Person2.jpg";
import Tile from "../Tile/Tile";
import Footer from "../Footer/Footer";
import "./Home.css";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/product/getCategory")
      .then(response => {
        this.setState({
          category: response.data.data,
        });
      });
  }
  render() {
    return (
      <>
        <Nav />
        <Container fluid className='p-5 IntroCon'>
          <h1 className='m-5 p-5 display-2'>Bring Light To Your Life</h1>
        </Container>
        <Container fluid className='pt-4 text-center'>
          <h2 className='display-4'>Products</h2>
          <Container>
            <div className='CardContainer d-flex flex-wrap justify-content-center'>
              {this.state.category.length ? (
                this.state.category.map(val => (
                  <div key={val}>
                    <Tile title={val} Href={`/Products?Cat=${val}`} />
                  </div>
                ))
              ) : (
                <h1>searching....</h1>
              )}
            </div>
          </Container>
        </Container>
        <Container fluid className='pt-4 text-center test'>
          <h2 className='display-4'>Testimony</h2>
          <Container className='p-4 d-flex flex-wrap justify-content-center'>
            <Card className='text-white'>
              <Card.Img src={Person} alt='Card image' />
              <Card.ImgOverlay className='graback p-5'>
                <Card.Title>
                  <h2>Vidhika Kulkarni</h2>
                </Card.Title>
                <Card.Text>
                  Where to use them, how testimonials are written, how to get
                  testimonials and why testimonials are effective. We’ll add
                  customer testimonial examples throughout.
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <Card className='text-white'>
              <Card.Img src={Person2} alt='Card image' />
              <Card.ImgOverlay className='graback p-5'>
                <Card.Title>
                  <h2>Anuj Ramanujan</h2>
                </Card.Title>
                <Card.Text>
                  Where to use them, how testimonials are written, how to get
                  testimonials and why testimonials are effective. We’ll add
                  customer testimonial examples throughout.
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Container>
        </Container>
        <Footer />
      </>
    );
  }
}
export default Home;
