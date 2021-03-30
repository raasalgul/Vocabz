import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../FlashCard/FlashCard.css'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import {serviceURLHost} from "../../constants/Constant";
import authHeader from '../services/auth-header';
const useStyles = makeStyles({
  cross:{
    position: 'relative',
    // marginTop:'99%'
    top:'-8em',
    right:'-4.2em'
  },
    card_button:{
        position: 'relative',
      // marginTop:'99%'
      top:'6em',
      },
      cross_button:{
        backgroundColor: "#FF6347",
        color:"#ffffff",
        float:"left",
        margin:10, 
        borderRadius:"100px",
        minWidth:"min-content", 
        '&:hover': {
         backgroundColor:'#FF6347',
         color: '#FFF'
     }
     },
     view_button:{
        backgroundColor: "#41658A",
        color:"#ffffff",
        float:"center",
        margin:10,
        '&:hover': {
          backgroundColor:'#41658A',
          color: '#FFF'
      }
     },
      tick_button:{
        backgroundColor: "#006400",
        color:"#ffffff",
        float:"right",
        margin:10,
        borderRadius:"100px",
        minWidth:"min-content",
        '&:hover': {
          backgroundColor:'#006400',
          color: '#FFF'
      }
     }
});
export default function FlashCard({flashdeck}) {
    const classes = useStyles();
    const history = useHistory();
    async function handleCross()
    {
      const response = await fetch(`${serviceURLHost}/vocabz-home/deck/delete/${flashdeck.deckName}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: authHeader(),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return await response.json().then(()=>{window.location.reload(false); }); // parses JSON response into native JavaScript objects
    }
    return (
<div
      className={`card`}
    >
      <div className={classes.cross}>
      {/* <Button variant='contained' onClick={handleCross}>&#10060;</Button> */}
      </div>
      <div className="front"  onClick={() =>history.push({
        pathname:`/flash-cards`,
        state: { deckName: flashdeck.deckName }
      })}>
        <h1>{flashdeck.deckName}</h1> 
      </div>
    </div>
    );
}