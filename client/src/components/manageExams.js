import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class manageExam extends Component {
  constructor() {
    super();
    this.state = {
      examname: "",
      coursename: "",
      description: "",
      duedate: null,
      redirectTo: null,
      notifystudents: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //   componentDidMount() {
  //     axios
  //       .get("/api/users/admincou")
  //       .then(response => {
  //         this.setState({ users: response.data });
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //       });
  //   }

  handleSubmit(event) {
    event.preventDefault();
    var coursename = this.state.coursename;
    var examname = this.state.examname;

    axios
      .post("/api/users/notify", {
        course: coursename
      })
      .then(response => {
        this.setState({
          notifystudents: response.data
        });

        this.state.notifystudents.map(student => {
          axios
            .post("/api/examnotify", {
              name: examname,
              student: student.username
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post("/api/exams/addExam", {
        examname: this.state.examname,
        coursename: this.state.coursename,
        description: this.state.description,
        duedate: this.state.duedate
      })
      .then(response => {
        console.log("data added" + response.data);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      examname: "",
      coursename: "",
      description: "",
      duedate: null
    });
  }

  render() {
    // let instructors = this.state.users;
    // let options = instructors.map(user => (
    //   <option key={user.username}>{user.username}</option>
    // ));

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container">
          <form>
          <h4> Manage Exams </h4>
          <br/>
            <div class="form-group">
    <label for="exampleInputEmail1">Exam Name</label>
    <input type="text" 
       class="form-control" 
       id="examname"
       name="examname" 
       placeholder="examname"
       value={this.state.examname}
       onChange={this.handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Course</label>
    <input type="text" 
       class="form-control" 
       id="coursename"
       name="coursename" 
       placeholder="coursename"
       value={this.state.coursename}
       onChange={this.handleChange}/>
  </div>
  <div class="form-group ">
    <label for="exampleInputEmail1">Description</label>
    <input type="text" 
       class="form-control input-lg" 
      id="description"
      name="description"
      placeholder="description"
      value={this.state.description}
      onChange={this.handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Select Due Date</label>
    <input type="date"
     class="form-control"
      id="duedate" 
      name="duedate"
      placeholder="duedate"
      value={this.state.date}
      onChange={this.handleChange}/>
            &nbsp;

  </div>
  <button type="submit"   onClick={this.handleSubmit} class="btn btn-primary btn-lg">Submit</button>&nbsp;
  <Link to="/updateExams">
                <button className="btn btn-dark btn-lg ">UpdateExam </button>
              </Link>
          </form>
        </div>
      );
    }
  }
}

export default manageExam;
