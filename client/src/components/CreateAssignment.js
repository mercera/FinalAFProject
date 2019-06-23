import React, { Component } from "react";
import { authenticationService } from "../services/authentication.service";
import axios from "axios";

class CreateAssignment extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      coursename: "",
      description: "",
      courses: [],
      date: "",
      startDate: "",
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

  componentDidMount() {
    const currentuser = authenticationService.currentUserValue;
    axios
      .post("/api/courses/getCoursestrue", {
        name: currentuser.username
      })
      .then(response => {
        this.setState({
          courses: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    var coursename = this.state.coursename;
    var assignmentname = this.state.name;

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
            .post("/api/notifications", {
              name: assignmentname,
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
      .post("/api/assignments/", {
        name: this.state.name,
        coursename: this.state.coursename,
        description: this.state.description,
        date: this.state.date
      })
      .then(response => {
        alert("Assignment Succesfully Created");
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      coursecode: "",
      coursename: "",
      lecturer: ""
    });
  }
  render() {
    let courses = this.state.courses;
    let options = courses.map(course => (
      <option key={course.coursename}>{course.coursename}</option>
    ));

    return (
      <div className="container">
        
        <form>
        <h4> Add Assignment </h4>
         <hr/>
          <div class="form-group">
    <label for="exampleInputEmail1">Assignment Name</label>
    <input type="text" 
       class="form-control" 
       id="assignmentname"
       name="name" 
       placeholder="Enter name"
       value={this.state.name}
       onChange={this.handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Description</label>
    <input type="password"
     class="form-control"
      id="description" 
      name="description"
      placeholder="Enter Description"
      value={this.state.description}
      onChange={this.handleChange}/>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">Select Course</label>
    <select
              id="inputState"
              class="form-control"
              value={this.state.coursename}
              onChange={e => this.setState({ coursename: e.target.value })}
            >
              <option selected>...</option>
            {options}
            </select>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Select Due Date</label>
    <input type="date"
     class="form-control"
      id="duedate" 
      name="date"
      placeholder="duedate"
      value={this.state.date}
      onChange={this.handleChange}/>
            &nbsp;

  </div>
  <br />
  
  <button type="submit"  onClick={this.handleSubmit} class="btn btn-primary btn-lg">Submit</button>
          
        </form>
      </div>
    );
  }
}

export default CreateAssignment;
