import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


class addCourse extends Component {
  constructor() {
    super();
    this.state = {
      coursecode: "",
      coursename: "",
      lecturer: "",
      users: [],
      instructors: [],
      redirectTo: null
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
    axios
      .get("/api/users/admincou")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/courses/addcourse", {
        coursecode: this.state.coursecode,
        coursename: this.state.coursename,
        lecturer: this.state.lecturer
      })
      .then(response => {
        console.log("data added" + response.data);
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
    let instructors = this.state.users;
    let options = instructors.map(user => (
      <option key={user.username}>{user.username}</option>
    ));

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container">
<form>
             <h4> Add course </h4>
             <br/>
            <div class="form-group">
    <label for="exampleInputEmail1">Course code</label>
    <input type="text" 
       class="form-control" 
       id="coursecode"
       name="coursecode" 
       placeholder="coursecode"
       value={this.state.coursecode}
        onChange={this.handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Course name</label>
    <input type="text" 
       class="form-control" 
       id="coursename"
       name="coursename" 
       placeholder="coursename"
       value={this.state.coursename}
        onChange={this.handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Lecturer name</label>
    <select
              id="inputState"
              class="form-control"
              value={this.state.lecturer}
              onChange={e => this.setState({ lecturer: e.target.value })}
            >
<option selected>...</option>
              {options}

            </select>
            <br />
            <br />
  </div>
  <button type="submit"  onClick={this.handleSubmit} class="btn btn-primary">Submit</button>

          </form> 
        </div>
   
      );
    }
  }
}

export default addCourse;
