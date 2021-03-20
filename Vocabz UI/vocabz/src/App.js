import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Redirect} from "react-router-dom";
import {dashboardRoutes} from "./constants/RoutesObjects";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
     <Toolbar style={{backgroundColor:'#AE8875'}}>
          <Typography variant="h6" noWrap>
            Vocabz
          </Typography>
        </Toolbar>
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
     <Redirect from="/" to="flash-decks" />
     </Router>
    </div>
  );
}

export default App;
