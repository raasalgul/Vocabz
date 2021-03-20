import React from 'react';
import {useEffect,useState} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../FlashCard/FlashCard.css'
const useStyles = makeStyles({
    card_button:{
        position: 'relative',
      // marginTop:'99%'
      top:'6em'
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
export default function FlashCard({flashcard}) {
    const [flip, setFlip] = useState(false);
    const classes = useStyles();
   
    function handleNext() {
        console.log(`handle green`);
        setFlip(!flip);
    }
    function handlePrevious() {
        console.log(`handle red`);
        setFlip(!flip);
    }
    return (
<div
      className={`card ${flip ? 'flip' : ''}`}
    //   style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        <h1>{flashcard.card}</h1> 
      </div>
      <div className="back"><h3>{flashcard.meaning}</h3></div>
      <div className={classes.card_button}>
<Button size="small" variant="contained" color="default" className={classes.cross_button} onClick={handlePrevious}>&#x2717;</Button>
<Button size="small" variant="contained" color="default" className={classes.tick_button} onClick={handleNext}>&#10003;</Button>
</div>
    </div>
    );
}