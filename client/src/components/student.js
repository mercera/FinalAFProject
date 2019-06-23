import React, { Component } from "react";
import { authenticationService } from "../services/authentication.service";
import { Link } from "react-router-dom";
import axios from "axios";

class student extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
      assignments: [],
      exams: [],
      truefiles: [],
      truefilesexam: [],
      createassignnotify: [],
      createexamnotify: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
  }
  componentDidMount() {
    const currentuser = authenticationService.currentUserValue;

    axios
      .post("/api/assignments/course", {
        name: currentuser.courses[0]
      })
      .then(response => {
        this.setState({
          assignments: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post("/api/exams/course", {
        name: currentuser.courses[0]
      })
      .then(response => {
        this.setState({
          exams: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post("/api/assignmentfiles/getfilestatus", {
        student: currentuser.username
      })
      .then(response => {
        this.setState({
          truefiles: response.data
        });

        if (response.data != null) {
          this.state.truefiles.map(files =>
            alert(
              "You have new assignments that has been marked! Assignment Name: " +
                files.assignmentname
            )
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .post("/api/examfiles/getfilestatus", {
        student: currentuser.username
      })
      .then(response => {
        this.setState({
          truefilesexam: response.data
        });

        if (response.data != null) {
          this.state.truefilesexam.map(files =>
            alert(
              "You have new exams that has been marked! Exam Name: " +
                files.examname
            )
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
    console.log(currentuser.username);

    axios
      .post("/api/notifications/getnotifications", {
        student: currentuser.username
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          createassignnotify: response.data
        });

        if (response.data != null) {
          this.state.createassignnotify.map(notify =>
            alert(
              "New Assignment has been created! Assignment Name: " + notify.name
            )
          );
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post("/api/examnotify/getnotifications", {
        student: currentuser.username
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          createexamnotify: response.data
        });

        if (response.data != null) {
          this.state.createexamnotify.map(notify =>
            alert("New Exam has been created! Exam Name: " + notify.name)
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(assignment) {
    var formdata = new FormData();
    const currentuser = authenticationService.currentUserValue;

    var file = document.getElementById("file");
    formdata.append("file", file.files[0]);
    formdata.append("name", currentuser.username);
    formdata.append("assignmentname", assignment.name);
    formdata.append("course", assignment.coursename);

    axios
      .post(
        "/api/assignmentfiles/upload",

        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(response => {
        console.log("file added" + response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit1(exam) {
    var formdata = new FormData();
    const currentuser = authenticationService.currentUserValue;
    console.log(currentuser.username);

    var file1 = document.getElementById("file1");
    formdata.append("file1", file1.files[0]);
    formdata.append("name", currentuser.username);
    formdata.append("examname", exam.examname);
    formdata.append("course", exam.coursename);

    axios
      .post(
        "/api/examfiles/upload",

        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(response => {
        console.log("file added" + response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <h3>Welcome to Student Page!</h3>
        <Link to="/sechome">
          <button className="btn btn-success">Home </button>
        </Link>
        <Link to="/joincourse">
          <button className="btn btn-dark ml-3">Join Course </button>
        </Link>
        <Link to="/notificationstudent">
          <button className="btn btn-outline-warning ml-3">Notifications </button>
        </Link><br/>
        <h3>Assignments</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Course Name</td>
              <td>Description</td>
              <td>Upload File</td>
            </tr>
          </thead>
          <tbody>
            {this.state.assignments.map((assignment, i) => {
              return (
                <tr>
                  <td>{assignment.name}</td>
                  <td>{assignment.coursename}</td>
                  <td>{assignment.description}</td>
                  <td>
                    <from
                      id="uploadfile"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      <div class="form-group">
                        <lable>Upload file</lable>
                        <input
                          type="file"
                          name="file"
                          id="file"
                          class="form-control"
                          onChange={this.handleChange}
                        />
                      </div>

                      <button
                        className="btn btn-primary col-md-3 ml-3"
                        onClick={() => this.handleSubmit(assignment)}
                      >
                        Submit
                      </button>
                    </from>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Exams</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Course Name</td>
              <td>Description</td>
              <td>Upload File</td>
            </tr>
          </thead>
          <tbody>
            {this.state.exams.map((exam, i) => {
              return (
                <tr>
                  <td>{exam.examname}</td>
                  <td>{exam.coursename}</td>
                  <td>{exam.description}</td>
                  <td>
                    <from
                      id="uploadfile2"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      <div class="form-group">
                        <lable>Upload file</lable>
                        <input
                          type="file"
                          name="file1"
                          id="file1"
                          class="form-control"
                          onChange={this.handleChange}
                        />
                      </div>

                      <button
                        className="btn btn-primary col-md-3 ml-3"
                        onClick={() => this.handleSubmit1(exam)}
                      >
                        Submit
                      </button>
                    </from>
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

export default student;
