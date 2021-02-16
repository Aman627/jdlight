import React, { Component } from "react";
import "./Footer.css";
import {
  Facebook,
  Instagram,
  Twitter,
  HouseFill,
  PhoneFill,
  EnvelopeFill,
} from "react-bootstrap-icons/";
import axios from "axios";

class Footer extends Component {
  state = { details: [] };

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    await axios
      .get("http://localhost:5000/api/extra/getExtra")
      .then(response => {
        this.setState({
          details: response.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return this.state.details.map(detail => (
      <div key={detail.mobileNumber}>
        <div className='footer'>
          <div className='div1 flex-wrap'>
            <div className='About'>
              <h2>More About Company</h2>
              <div className='aboutcontent'>
                <p>
                  You’re about to dive into the complete guide for website
                  testimonials. We’re going to answer the top questions: Where
                  to use them, how testimonials are written, how to get
                  testimonials and why testimonials are effective. We’ll add
                  customer testimonial examples throughout.
                </p>
              </div>
              <p className='Name'>-Name, CEO </p>
            </div>
            <div className='Connect'>
              <h2>Keep Connected</h2>
              <div className='social'>
                <a href={detail.facebookLink} target='_blank'>
                  <div className='fb'>
                    <div className='circleback ' id='facebook'>
                      <Facebook className='ml-2' />
                    </div>
                    <p>Like us on Facebook</p>
                  </div>
                </a>
                <a href={detail.igLink} target='_blank'>
                  <div className='insta'>
                    <div className='circleback' id='insta'>
                      <Instagram className='ml-2' />
                    </div>
                    <p>Follow us on Instagram</p>
                  </div>
                </a>
                <a href={detail.twitterLink} target='_blank'>
                  <div className='twitter'>
                    <div className='circleback' id='twitter'>
                      <Twitter className='ml-2'></Twitter>
                    </div>
                    <p>Follow us on Twitter</p>
                  </div>
                </a>
              </div>
            </div>
            <div className='Contact'>
              <h2>Contact Information</h2>
              <div className='condetails'>
                <div>
                  <HouseFill className='mr-3' />
                  <p>{detail.address}</p>
                </div>
                <div>
                  <PhoneFill className='mr-3' />
                  <p>{detail.mobileNumber}</p>
                </div>
                <div>
                  <EnvelopeFill className='mr-3' />
                  <p>{detail.emailId}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='Copyrightsection'>
            <div>
              <i class='fa fa-copyright' aria-hidden='true'></i>Since 2020 |
              Developed By
              <strong> Dev Pirates</strong>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}

export default Footer;
