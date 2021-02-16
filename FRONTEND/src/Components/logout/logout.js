import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("admintoken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("token");
    localStorage.removeItem("emailId");
  }

  render() {
    return (
      <>
        <Redirect to='/' />
      </>
    );
  }
}

export default logout;
