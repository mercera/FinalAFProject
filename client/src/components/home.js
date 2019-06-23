import React, { Component } from "react";
import image from "./../book2.jpg";
import { Link } from "react-router-dom";

class home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <img src={image} className="App-logo" alt="" />
          <br />
          <br />
          <br />
          <h1 className="App-title">CourseWeb</h1>
        </header>
<br/>
        <p>
          <Link to="/login">
          <button type="button" class="btn btn-outline-primary btn-lg ">Login </button>
          </Link>
          <Link to="/signup">
          <button type="button" class="btn btn-outline-success btn-lg ml-3">Sign up</button>
          </Link>
        </p>
      </React.Fragment>
    );
  }
}

export default home;
