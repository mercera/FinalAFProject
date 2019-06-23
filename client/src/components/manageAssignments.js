import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class manageAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      updateddate: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.updatedate = this.updatedate.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/assignments/")
      .then(response => {
        this.setState({ assignments: response.data });
        console.log(response.data.duedate);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(event, index) {
    const value = event.target.value;
    this.setState(oldState => {
      const newState = oldState.updateddate.slice();
      newState[index] = value;
      return {
        updateddate: newState
      };
    });
  }

  updatedate(id, index) {
    axios
      .put(`/api/assignments/${id}`, {
        duedate: this.state.updateddate[index]
      })
      .then(res => {
        console.log(res);
        alert("Date Succesfully extended");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/createAssignment">
          <button className="btn btn-dark col-md-3 ml-3">
            Create Assignment{" "}
          </button>
        </Link>
        <h2>Update Assignments</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Assignment Name</td>
              <td>Course Name</td>
              <td>due date</td>
              <td>change date</td>
            </tr>
          </thead>
          <tbody>
            {this.state.assignments.map((assignment, index) => {
              return (
                <tr>
                  <td>{assignment.name}</td>
                  <td>{assignment.coursename}</td>
                  <td>{assignment.duedate}</td>
                  <td>
                    <input
                      type="date"
                      name="updateddate"
                      id="daterestrict"
                      min={assignment.duedate}
                      value={this.state.updateddate[index]}
                      onChange={e => this.handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.updatedate(assignment._id, index)}
                    >
                      change
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

export default manageAssignments;
