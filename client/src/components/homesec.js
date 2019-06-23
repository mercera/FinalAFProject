import React, { Component } from "react";
import { authenticationService } from "../services/authentication.service";
import { Link } from "react-router-dom";
import image from "./../succs.jpg";

class homesec extends Component {
  state = {};

  logout() {
    authenticationService.logout();
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav">
            <Link to="/admin" className="nav-item nav-link">
              Admin
            </Link>
            <Link to="/student" className="nav-item nav-link">
              Student
            </Link>
            <Link to="/instructor" className="nav-item nav-link">
              Instructor
            </Link>

            <a onClick={this.logout} className="nav-item nav-link">
              Logout
            </a>
          </div>
        </nav>

        <h3>You are logged in to home page</h3>
        <img src={image}class="img-fluid" alt="Responsive image"/>
        
      </React.Fragment>
    );
  }
}

export default homesec;
