import React from 'react';
import {useEffect,useState} from "react";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../FlashCard/FlashCard.css'
import {serviceURLHost} from "../../constants/Constant"
import authHeader from '../services/auth-header';
const useStyles = makeStyles({
  cross:{
    // position: 'relative',
    // marginTop:'99%'
    // top:'-8.2em',
    // right:'-7.3em'
  },
    card_button:{
        // position: 'relative',
      // marginTop:'99%'
      // top:'6em',
      // right:'2em'
      },
      cross_button:{
        backgroundColor: "#FF6347",
        color:"#ffffff",
        // float:"left",
        margin:5, 
        borderRadius:"100px",
        minWidth:"min-content", 
        '&:hover': {
         backgroundColor:'#FF6347',
         color: '#FFF'
     }
     },
     minu_button:{
      backgroundColor: "#cbe009",
      color:"#ffffff",
      // float:"left",
      margin:5, 
      borderRadius:"100px",
      minWidth:"min-content", 
      '&:hover': {
       backgroundColor:'#cbe009',
       color: '#FFF'
   }
     },
     view_button:{
        backgroundColor: "#41658A",
        color:"#ffffff",
        // float:"center",
        margin:10,
        '&:hover': {
          backgroundColor:'#41658A',
          color: '#FFF'
      }
     },
      tick_button:{
        backgroundColor: "#006400",
        color:"#ffffff",
        // float:"right",
        margin:5,
        borderRadius:"100px",
        minWidth:"min-content",
        '&:hover': {
          backgroundColor:'#006400',
          color: '#FFF'
      }
     }
});
export default function FlashCard({flashcard,flashdeck,removeCard}) {
  // useEffect(()=>{
  //   let splitedWords=flashcard.meaning.split(" ");
  //   let word="";
  //   splitedWords.forEach((v,k)=>{
  //     if((k+1)%5===0)
  //     {
  //       word+="\n";
  //     }
  //       word+=v+" ";
  //   });
  //   flashcard.meaning=word;
  
  // },[]);
    const [flip, setFlip] = useState(false);
    const classes = useStyles();
    async function handleCross()
    {
      let data={};
      let cards=[];
      let updateCard={};
      data.deck=flashdeck;
      updateCard.card=flashcard.card;
      updateCard.meaning=flashcard.meaning;
      cards.push(updateCard);
      data.cards=cards;
      console.log(data);
      const response = await fetch(`${serviceURLHost}/vocabz-home/card/delete`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: authHeader(),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });

      return await response.json().then(()=>{removeCard(flashcard.card) }); // parses JSON response into native JavaScript objects
   
    }
    async function handleNext(todo) {
      let data={};
      data.deck=flashdeck;
      data.card=flashcard.card;
      data.status=todo;
      console.log(data);
      const response = await fetch(`${serviceURLHost}/vocabz-home/card/status-update`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: authHeader(),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });

      return await response.json().then(()=>{removeCard(flashcard.card)}); // parses JSON response into native JavaScript objects

    }
    return (
      <Grid container direction="column" spacing={1}>
{  console.log("word "+flashcard.meaning)}
{/* <div
      className={`card ${flip ? 'flip' : ''}`}
    //   style={{ height: height }}
    > */}
       <Grid className={`card ${flip ? 'flip' : ''}`} container spacing={1} alignItems="flex-start"  onClick={() => setFlip(!flip)}>
        <Grid item direction="column" container justify="flex-end"
          alignItems="flex-end">
      <Button variant='contained' onClick={handleCross}>&#10060;</Button>
      </Grid >
      <Grid container wrap="nowrap" xs={12} justify="center">
      {/* <div className="front">
        <h1>{flashcard.card}</h1> 
      </div> */}
      {!flip?<Typography className="front" variant="h5">{flashcard.card}</Typography>:
      <Typography className="back" variant="body1">{flashcard.meaning}</Typography>
    }
      </Grid>
      {/* <Grid  spacing={2}>
      <Grid item xs>
      </Grid>
      </Grid> */}
      {/* <div className={classes.card_button}> */}
      <Grid item xs={12} sm container>
      <Grid item xs container>
      <Grid item xs>
<Button size="small" variant="contained" color="default" className={classes.cross_button} onClick={()=>handleNext("failure")}>&#x2717;</Button>
</Grid>
<Grid item xs>
<Button size="small" variant="contained" color="default" className={classes.minu_button} onClick={()=>handleNext("neutral")}>&#8722;</Button>
</Grid>
<Grid item xs>
<Button size="small" variant="contained" color="default" className={classes.tick_button} onClick={()=>handleNext("sucess")}>&#10003;</Button>
</Grid>
</Grid>
</Grid>
{/* </div> */}
</Grid>
    {/* </div> */}
    </Grid>
    );
}