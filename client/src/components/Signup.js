import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
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

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("/api/users/", {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (this.state.password === this.state.confirmPassword) {
          console.log("successful signup");
          this.setState({
            //redirect to login page
            redirectTo: "/login"
          });
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <h4> Sign up </h4>
          <form>
        <br/>
  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="text" 
       class="form-control" 
       id="Email"
       name="email" 
       placeholder="Enter email"
       value={this.state.email}
       onChange={this.handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="text" 
       class="form-control" 
       id="Username"
       name="username" 
       placeholder="Username"
       value={this.state.username}
       onChange={this.handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password"
     class="form-control"
      id="Password" 
      name="password"
      placeholder="Password"
      value={this.state.password}
      onChange={this.handleChange}/>{" "}
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Confirm Password</label>
    <input type="password"
     class="form-control"
      id="confirmPassword" 
      name="confirmPassword"
      placeholder="Confirm Password"
      value={this.state.confirmPassword}
      onChange={this.handleChange}/>{" "}
  </div>
  <button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Submit</button>
</form>
        </div>
      );
    }
  }
}

export default Signup;
