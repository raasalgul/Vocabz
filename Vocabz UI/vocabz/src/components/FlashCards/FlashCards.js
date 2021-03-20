import React from 'react';
import {useEffect,useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FlashCard from '../FlashCard/FlashCard';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  MuiGridGridXs3:{
flexBasis:'15%'
  },
  root: {
    '& .MuiGrid-grid-xs-3': {
      // '& > $item': {
        flexBasis:'15%'
      // },
  },
  '& .MuiButton-outlined':{
    position:'relative',
    left:'57.8em'
  },
    position: 'relative',
    top:'50px'
  },
  year: {
   display:'flex',
   marginRight:30,
   flexDirection:'column',
   alignItems:'flex-end'
  },
  root_cardContent:{
    backgroundImage:'linear-gradient(to bottom,#7F8086,#080808);',
    minHeight:550,
    // maxHeight: 500,
    overflowY:'scroll'
  },
  topic_style: {
    color: "#FFF",
    fontSize: 32,
    fontFamily:"Andale Mono",
    padding:20
  },
  fab: {
    position:'relative',
    top:'40%'
  }
});
let topicIndex=0;
export default function FlashCards() {
  const history = useHistory();
    const serviceURLHost="http://localhost:8089";
  const classes = useStyles();

const [yearKeys,setYearKeys]=useState(['2021']);
const [yearKey,setYearKey]=useState('2021');
const [deckKeys,setDeckKeys]=useState(['1-100']);
const [deckKey,setDeckKey]=useState('1-100');
const [data,setData]=useState({
  "2021": {
    "1-100": [
        {
            "word":"test",
            "meaning":"An evaluation of certain thing",
            "level": "10",
            "correct": true,
            "addedLogon": "2021-03-06T23:05:23.965",
            "addedDate": "2019-01-01"
        },
        {
          "word":"test",
          "meaning":"An evaluation of certain thing",
          "level": "10",
          "correct": true,
          "addedLogon": "2021-03-06T23:05:23.965",
          "addedDate": "2019-01-01"
      }
    ]
}

});
const [load,setLoad]=useState(true);
useEffect(()=>{
//   const card = document.querySelector(".card__inner");

// card.addEventListener("click", function (e) {
//   card.classList.toggle('is-flipped');
// });


//   fetch(`${serviceURLHost}/Elotz-home/allData/view`).then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//     setData(myJson);
//     let keys=Object.keys(myJson);
//     setYearKeys(keys);
//     setYearKey(`${keys[0]}`);
//     let deckKeys=Object.keys(myJson[keys[0]]);
//     setDeckKeys(deckKeys);
//     setDeckKey(deckKeys[0]);
//     setLoad(true);
//     });
  },[]);
  function handleAdd() {
    history.push(`/edit-card`);
  }
  function handlePrevious() {
    topicIndex>0?--topicIndex:topicIndex=deckKeys.length-1;
    // console.log(`${topicIndex} Length ${Object.length}`);
    var name=deckKeys[topicIndex];
    setDeckKey(name.toUpperCase());
    }
return (
  <div>
  {load?<div className={classes.root}>
        {console.log(`both ${+Object.keys(data).length !== 0 && data.constructor !== Object}`)}
        {console.log(`single ${+Object.keys(data).length}`)}
            <Card className={classes.root_cardContent}>
            <Button variant='outlined' onClick={()=>{history.push(`/flash-decks`)}}>&#10060;</Button>
            <Typography variant="h5" component="h2" className={classes.topic_style}>
                       {deckKey}
                       </Typography>
            <CardContent>
                <Grid container spacing={1}>
                {
                  Object.keys(data).length !== 0?data[yearKey][deckKey].map((value,index)=>{
                    return(
                     <Grid item key={index} item xs={3}>
                    <FlashCard flashcard={value}/>
                     </Grid>);
                }
                )
               :null
                }
                 <Grid item xs={3}>
              <Fab
                size="large"
                aria-label="Add"
                onClick={handleAdd}
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </Grid>
            </Grid>
            </CardContent>
          </Card>
   </div>:null}

   </div>
  );
  
}