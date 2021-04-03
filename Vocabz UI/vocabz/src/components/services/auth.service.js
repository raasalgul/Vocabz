import axios from "axios";

const API_URL = "http://localhost:8089/api/auth/";

class AuthService {
  login(userName, password) {
    return axios
      .post(API_URL + "signin", {
        userName,
        password
      })
      .then(response => {
        console.log(JSON.stringify(response))
        if (response.data.accessToken) {
          let res={};
          res.id=response.data.id;
          res.username=response.data.username;
          res.accessToken=response.data.accessToken;
          res.tokenType=response.data.tokenType;
          localStorage.setItem("user", JSON.stringify(res));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register( userName,
    email,
    password,
    firstName,
    lastName) {
    return axios.post(API_URL + "signup", {
      userName,
       email,
       password,
       firstName,
       lastName
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
