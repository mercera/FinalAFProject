import React, { Component } from "react";
import axios from "axios";

class Addmarks extends Component {
  constructor() {
    super();
    this.state = {
      assignments: [],
      exams: [],
      marks: [],
      marksExam: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
    this.onsubmit1 = this.onsubmit1.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/assignmentfiles/getfiles")
      .then(response => {
        this.setState({
          assignments: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/api/examfiles/getfiles")
      .then(response => {
        this.setState({
          exams: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event, index) {
    const value = event.target.value;
    this.setState(oldState => {
      const newState = oldState.marks.slice();
      newState[index] = value;
      return {
        marks: newState
      };
    });
  }

  handleChange2(event, index) {
    const value = event.target.value;
    this.setState(oldState => {
      const newState = oldState.marksExam.slice();
      newState[index] = value;
      return {
        marksExam: newState
      };
    });
  }

  onsubmit(id, index) {
    axios
      .put(`/api/assignmentfiles/${id}`, {
        marks: this.state.marks[index]
      })
      .then(res => {
        console.log(res);
        alert("Marks Succesfully Added");
      })
      .catch(err => {
        console.log(err);
      });
  }

  onsubmit1(id, index) {
    axios
      .put(`/api/examfiles/${id}`, {
        marksExam: this.state.marksExam[index]
      })
      .then(res => {
        console.log(res);
        alert("Marks Succesfully Added");
        console.log(id);
        console.log(this.state.marksExam);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let assignments = this.state.assignments;
    let assignment = assignments.map((assignment, index) => (
      <tr>
        <td>{assignment.assignmentname}</td>
        <td>{assignment.course}</td>
        <td>{assignment.student}</td>
        <td>
          <a
            href={process.env.PUBLIC_URL + "/uploads/" + assignment.filename}
            download
          >
            Download
          </a>
        </td>
        <td>
          <input
            class="form-control"
            type="text"
            id="marks"
            name="marks"
            placeholder="Enter Marks"
            value={this.state.marks[index]}
            onChange={e => this.handleChange(e, index)}
          />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.onsubmit(assignment._id, index)}
          >
            Assign Mark
          </button>
        </td>
      </tr>
    ));

    let exams = this.state.exams;
    let exam = exams.map((exam, index) => (
      <tr>
        <td>{exam.examname}</td>
        <td>{exam.course}</td>
        <td>{exam.student}</td>
        <td>
          <a
            href={process.env.PUBLIC_URL + "/uploads/" + exam.filename}
            download
          >
            Download
          </a>
        </td>
        <td>
          <input
            type="text"
            class="form-control"
            id="marks"
            name="marksExam"
            placeholder="Enter Marks"
            value={this.state.marksExam[index]}
            onChange={e => this.handleChange2(e, index)}
          />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.onsubmit1(exam._id, index)}
          >
            Assign Mark
          </button>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <h3>Assignment Marks</h3>
        <hr />
        <table className="table table-dark">
          <thead>
            <tr>
              <td>Assignment Name</td>
              <td>Assignment Course</td>
              <td>Student Name</td>
              <td>File</td>
              <td>Marks</td>
            </tr>
          </thead>
          <tbody>{assignment}</tbody>
        </table>
        <br />
        <h3>Exam Marks</h3>
        <hr />
        <table className="table table-dark">
          <thead>
            <tr>
              <td>Exam Name</td>
              <td>Course</td>
              <td>Student Name</td>
              <td>File</td>
              <td>Marks</td>
            </tr>
          </thead>
          <tbody>{exam}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Addmarks;
