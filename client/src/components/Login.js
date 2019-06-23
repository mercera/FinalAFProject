import React, { Component } from "react";
//import axios from "axios";
import { Redirect } from "react-router-dom";
import { authenticationService } from "../services/authentication.service";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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

    authenticationService
      .login(this.state.email, this.state.password)
      .then(user => {
        this.setState({
          //redirect to login page
          redirectTo: "/sechome"
        });
      });

    // axios
    //   .post("/api/users/login", {
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    //   .then(response => {
    //     if (response.status === 200) {
    //       console.log(response.data);
    //       this.setState({
    //         //redirect to login page
    //         redirectTo: "/sechome"
    //       });
    //     } else console.log("password incorrect");
    //   })
    //   .catch(error => {
    //     console.log("signup error: ");
    //     console.log(error);
    //   });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <form>
        <h4> Login </h4>
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
    <label for="exampleInputPassword1">Password</label>
    <input type="password"
     class="form-control"
      id="Password" 
      name="password"
      placeholder="Password"
      value={this.state.password}
      onChange={this.handleChange}/>
  </div>
  <button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Submit</button>
</form>
      );
    }
  }
}

export default Login;
