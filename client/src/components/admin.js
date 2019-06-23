import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/users/admin")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  tabRow() {
    return this.state.users.map((object, i) => {
      return <TableRow obj={object} key={i} />;
    });
  }
  render() {
    return (
      <div className="container">
        <header>
          <br />
          <Link to="/sechome">
            <button className="btn btn-success col-md-3">Home </button>
          </Link>
          <Link to="/addCourse">
            <button className="btn btn-dark col-md-3 ml-3">Add Course </button>
          </Link>
        </header>
        <br/>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>ID</td>
              <td>username</td>
              <td>email</td>
              <td>Role</td>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}

export default admin;
