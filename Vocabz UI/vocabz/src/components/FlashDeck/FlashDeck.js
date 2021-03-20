import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../FlashCard/FlashCard.css'
import { useHistory } from "react-router-dom";
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
export default function FlashCard({flashdeck}) {
    const classes = useStyles();
    const history = useHistory();
    return (
<div
      className={`card`}
    //   style={{ height: height }}
      onClick={() =>history.push({
        pathname:`/flash-cards`,
        state: { deckName: flashdeck.deckName }
      })}
    >
      <div className="front">
        <h1>{flashdeck.deckName}</h1> 
      </div>
    </div>
    );
}