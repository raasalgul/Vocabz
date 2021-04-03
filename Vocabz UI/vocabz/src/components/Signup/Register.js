import React from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import './Register.css'
import AuthService from "../services/auth.service";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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

const vem = value => {
  if (!isEmail(value)) {
    return 'This is not a valid email.';
  }
  else
  return ''
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return 'The userName must be between 3 and 20 characters.'
  }
  else
  return ''
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return 'The password must be between 6 and 40 characters.';
  }
  else
  return ''
};

export default function Register(props) {
  const [userName, setUserName] = React.useState('');
  const [password,setPassword]=React.useState('');
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [successful,setSuccessful]=React.useState(false);
  function onChangeUsername(e) {
    setUserName(e.target.value);
  }

  function onChangeEmail(e) {
      setEmail(e.target.value);
  }
function validateAll()
{
  let mes='';
  setMessage(mes);
  console.log(mes);
  console.log(message)
  if(mes.length<=0)
  mes=vusername(userName);
  if(mes.length<=0)
  {
  mes=vusername(firstName);
  if(mes.length>0)
  mes=mes.replace('userName','firstName');
  }
  if(mes.length<=0)
  mes=vem(email);
  if(mes.length<=0)
  mes=vpassword(password);
  setMessage(mes);
  if(mes.length===0)
  return true;
  else
  return false;
}
  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function onChangeFistname(e){
    setFirstName(e.target.value);
  }
  function onChangeLastname(e){
    setLastName(e.target.value);
  }
  function handleRegister(e) {
    validateAll();
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    // this.form.validateAll();
    console.log(message)
    if (message.length === 0 &&validateAll()) {
      AuthService.register(
       userName,
       email,
       password,
       firstName,
       lastName
      ).then(
        response => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setMessage(resMessage);
            setSuccessful(false);
        }
      );
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
            onSubmit={handleRegister}
            // ref={c => {
            //   this.form = c;
            // }}
          >
            {!successful && (
              <div>

                  <TextField
                    type="text"
                    label="Username"
                    classes={
                      {root:classes.textFieldRoot}
                    }
                    variant="outlined"
                    value={userName}
                    onChange={onChangeUsername}
                  />
                <TextField
                    type="text"
                    label="Firstname"
                    classes={
                      {root:classes.textFieldRoot}
                    }
                    variant="outlined"
                    value={firstName}
                    onChange={onChangeFistname}
                  />
                    <TextField
                    type="text"
                    label="Lastname"
                    classes={
                      {root:classes.textFieldRoot}
                    }
                    variant="outlined"
                    value={lastName}
                    onChange={onChangeLastname}
                  />

                  <TextField
                    type="text"
                    classes={
                      {root:classes.textFieldRoot}
                    }
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
                   />



                  <TextField
                    type="password"
                    classes={
                      {root:classes.textFieldRoot}
                    }
                    variant="outlined"
                    label="password"
                    value={password}
                    onChange={onChangePassword}
                  />

                  <Button  classes={{
                  root:classes.buttonRoot
                }}
                onClick={handleRegister}
                color={"primary"}
                variant={"contained"}>Sign Up</Button>
                </div>
            )}

            {message && (
                <div
                  className={
                    successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              // ref={c => {
              //   checkBtn = c;
              // }}
            />
          </Form>
        </div>
      </div>
    );
}
