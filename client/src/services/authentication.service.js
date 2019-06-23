import { BehaviorSubject } from "rxjs";
import axios from "axios";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(email, password) {
  return axios
    .post("/api/users/login", {
      email: email,
      password: password
    })
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        currentUserSubject.next(response.data);

        return response.data;
      } else console.log("password incorrect");
    })
    .catch(error => {
      console.log("signup error: ");
      console.log(error);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
