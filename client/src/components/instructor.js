import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { authenticationService } from "../services/authentication.service";

class instrcutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      falsecourses: null
    };
  }

  componentDidMount() {
    const currentuser = authenticationService.currentUserValue;

    axios
      .post("/api/courses/getCourses", {
        name: currentuser.username
      })
      .then(response => {
        this.setState({
          falsecourses: response.data
        });

        if (response.data != null) {
          this.state.falsecourses.map(course =>
            alert(
              "You have new course to be accepted! Course Name: " +
                course.coursename
            )
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          
        </div>
        <div class="btn-group-vertical">
        <h3>Welcome to Instructor Page!</h3>
        <br/>

        <Link to="/sechome">
          <button className="btn btn-success btn-lg">Home </button>
        </Link>
        <br/>
        <Link to="/manageAssignments">
          <button className="btn btn-dark btn-lg ">
            Manage Assignments{" "}
          </button>
        </Link>
        <br/>
        <Link to="/manageExams">
          <button className="btn btn-dark btn-lg">Manage Exams </button>
        </Link>
        <br/>

        <Link to="/Addmarks">
          <button className="btn btn-danger btn-lg">Add Marks </button>
        </Link>
        <br/>

        <NavLink
          to={{
            pathname: "/notifications",
            data: this.state.falsecourses
          }}
        >
          <button className="btn btn-outline-warning btn-lg">Notifications </button>
        </NavLink> 


        </div>
  
        
        
      </React.Fragment>
    );
  }
}

export default instrcutor;
