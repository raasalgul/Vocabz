import React from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AuthService from "../services/auth.service";
import './Login.css'
import { makeStyles } from '@material-ui/core/styles';
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const useStyles = makeStyles(() => ({
  buttonRoot: {
    margin: '10px',
    width: '200px'
  },
  textFieldRoot:{
    margin: '10px',
    width: '300px'
  }
}));
export default function Login(props) {
  const [username, setUsername] = React.useState('');
  const [password,setPassword]=React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading,setLoading]=React.useState(false);
  // constructor(props) {
  //   super(props);
  //   this.handleLogin = this.handleLogin.bind(this);
  //   this.onChangeUsername = this.onChangeUsername.bind(this);
  //   this.onChangePassword = this.onChangePassword.bind(this);

  //   this.state = {
  //     username: "",
  //     password: "",
  //     loading: false,
  //     message: ""
  //   };
  // }

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSignup(){
    window.location.href="/signup"
    // this.props.history.push("/signup");
  }
  function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // form.validateAll();
console.log(message.length)
    if (message.length === 0) {
      AuthService.login(username,password).then(
        () => {
          props.history.push("/flash-decks");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setMessage(resMessage);
            setLoading(false);
        }
      );
    } else { 
      setLoading(false);
    }
  }
  const classes = useStyles();
    return (
      <div className="col-md-12">
        <div className="login-card login-card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-login-card"
          />

          <Form
            onSubmit={handleLogin}
            // ref={c => {
            //   form = c;
            // }}
          >
            <div className="form-group">
              {/* <label htmlFor="username">Username</label> */}
              <TextField
                type="text"
               classes={
                 {root:classes.textFieldRoot}
               }
                label="Username"
                variant="outlined"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <TextField
                type="password"
                // className="form-control"
                classes={
                  {root:classes.textFieldRoot}
                }
                variant="outlined"
                label="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <Button
                classes={{
                  root:classes.buttonRoot
                }}
                color={"primary"}
                variant={"contained"}
                disabled={loading}
                onClick={handleLogin}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </Button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              // ref={c => {
              //   checkBtn = c;
              // }}
            />
          </Form>
          <Button
              classes={{
                root:classes.buttonRoot
              }}
              color={"primary"}
              variant={"contained"}
              onClick={handleSignup}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Signup</span>
              </Button>
        </div>
      </div>
    );
}
