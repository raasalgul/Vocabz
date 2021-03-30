import React from 'react';
import {useEffect,useState} from "react"
import './App.css';
import { browserHistory } from 'history'
import {BrowserRouter as Router,Route,Redirect} from "react-router-dom";
import {dashboardRoutes} from "./constants/RoutesObjects";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {useHistory} from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AuthService from "./components/services/auth.service"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#FFF'
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  useEffect(()=>{
    
  },[]);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    AuthService.logout();
    // history.push('/login');
    setAuth(false);
    window.location.href="/login"
  }
  return (
    <div className="App">
     <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar style={{backgroundColor:'#AE8875'}}>
          <Typography variant="h6" className={classes.title}>
            Vocabz
          </Typography>
          {
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
      <Router>
      {dashboardRoutes.map((prop,key) => {
        return(
         <Route
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
        );
                })
      }
     {/* <ResponsiveDrawer/> */}
     {/* <Redirect from= "exact /" to="login" /> */}
     <Route exact path="/">
    <Redirect to="/login" />
</Route>
     </Router>
    </div>
  );
}

export default App;
