import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class examupdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      duedate: null,
      updateddate: []
    };
    this.updatedate = this.updatedate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/exams/getExams")
      .then(response => {
        this.setState({ exams: response.data, duedate: response.data.duedate });
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
      .put(`/api/exams/${id}`, {
        duedate: this.state.updateddate[index]
      })
      .then(res => {
        console.log(res);
        alert("due date extended");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let exams = this.state.exams;
    let Exam1 = exams.map((exam, index) => (
      <tr>
        <td>{exam.examname}</td>
        <td>{exam.coursename}</td>
        <td>{exam.duedate}</td>
        <td>
          <input
            id="daterestrict"
            type="date"
            min={exam.duedate}
            onChange={e => this.handleChange(e, index)}
            name="updateddate"
            value={this.state.updateddate[index]}
          />
        </td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => this.updatedate(exam._id, index)}
          >
            change
          </button>
        </td>
      </tr>
    ));
    //  var edit= exam=>{
    //   axios.put(`/api/exams/${exam._id}`,{
    //     duedate:this.state.updateddate
    //  }).then(res=>{
    //    console.log(res);
    //    alert("due date changed");
    //  }).catch(err=>{
    //    console.log(err);
    //  });
    // }

    return (
      <div className="container">
        <h2>Update Exams</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>examname</td>
              <td>coursename</td>
              <td>due date</td>
              <td>change date</td>
            </tr>
          </thead>
          <tbody>{Exam1}</tbody>
        </table>
      </div>
    );
  }
}

export default examupdate;
