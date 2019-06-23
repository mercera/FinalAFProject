import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRole: "Instructor",
      options: []
    };
  }

  edit = obj => {
    console.log(obj);
    axios
      .put(`/api/users/${obj._id}`, {
        role: this.state.selectedRole,
        email: obj.email
      })
      .then(res => {
        console.log(res);
        alert("Role Succesfully Changed");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <tr>
        <td>{this.props.obj._id}</td>
        <td>{this.props.obj.username}</td>
        <td>{this.props.obj.email}</td>
        <td>
          <div class="form-group col-md-10">
            <select
              id="inputState"
              class="form-control"
              onChange={e => this.setState({ selectedRole: e.target.value })}
            >
              <option>Admin</option>
              <option>Instructor</option>
              <option>Student</option>
              <option selected>{this.props.obj.role}</option>
              }}
            </select>
          </div>
        </td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => this.edit(this.props.obj)}
          >
            Change Role
          </button>{" "}
        </td>
      </tr>
    );
  }
}

export default TableRow;
