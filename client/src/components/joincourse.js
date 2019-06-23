import React, { Component } from "react";
import { authenticationService } from "../services/authentication.service";
import axios from "axios";

class joincourse extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios
      .post(`/api/courses/getCoursestruejoin`)
      .then(response => {
        this.setState({
          courses: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  update = name => {
    const currentuser = authenticationService.currentUserValue;
    axios
      .put(`/api/users/joincourse/${currentuser._id}`, {
        course: name
      })
      .then(res => {
        console.log(res);
        alert("Succesfully Joined Course");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Join Courses</h2>
        <table className="table table-dark">
          <thead>
            <tr>
              <td>Course name</td>
              <td>Course Code</td>
              <td>Lecturer</td>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map((course, i) => {
              return (
                <tr>
                  <td>{course.coursename}</td>
                  <td>{course.coursecode}</td>
                  <td>{course.lecturer}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.update(course.coursename)}
                    >
                      Join Course
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default joincourse;
