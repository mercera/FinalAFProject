import React, { Component } from "react";
import "./App.css";
import { Route, Router } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { history } from "./helpers/history";
import { role } from "./helpers/role";
import student from "./components/student";
import instructor from "./components/instructor";
import Home from "./components/home";
import Signup from "./components/Signup";
import addCourse from "./components/addCourse";
import Login from "./components/Login";
import admin from "./components/admin";
import homesec from "./components/homesec";
import manageAssignments from "./components/manageAssignments";
import createAssignment from "./components/CreateAssignment";
import manageExams from "./components/manageExams";
import Notifications from "./components/Notifications";
import { authenticationService } from "./services/authentication.service";
import joincourse from "./components/joincourse";
import updateExam from "./components/examUpdate";
import Addmarks from "./components/Addmarks";
import notificationstudent from "./components/notificationstudent";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(user =>
      this.setState({
        currentUser: user,
        isAdmin: user && user.role === role.Admin
      })
    );
  }
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/manageAssignments" component={manageAssignments} />
          <Route path="/manageExams" component={manageExams} />
          <Route path="/createAssignment" component={createAssignment} />
          <Route path="/addCourse" component={addCourse} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/joincourse" component={joincourse} />
          <Route path="/updateExams" component={updateExam} />
          <Route path="/Addmarks" component={Addmarks} />
          <Route path="/notificationstudent" component={notificationstudent} />
          <PrivateRoute path="/admin" roles={[role.Admin]} component={admin} />

          <PrivateRoute
            path="/instructor"
            roles={[role.Instructor]}
            component={instructor}
          />
          <PrivateRoute
            path="/student"
            roles={[role.Student]}
            component={student}
          />
          <PrivateRoute exact path="/sechome" component={homesec} />
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Route exact path="/signup" component={Signup} />

                  <Route exact path="/login" component={Login} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
