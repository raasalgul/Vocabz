import React from 'react';
import {useEffect,useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FlashDeck from '../FlashDeck/FlashDeck';
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
    color: "#70A37F",
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
export default function FlashDecks() {
  const history = useHistory();
    const serviceURLHost="ec2-3-129-248-199.us-east-2.compute.amazonaws.com:8089";
  const classes = useStyles();

const [yearKeys,setYearKeys]=useState(['2021']);
const [yearKey,setYearKey]=useState('2021');
const [data,setData]=useState({});
const [load,setLoad]=useState(true);
useEffect(()=>{
  fetch(`${serviceURLHost}/vocabz-home/decks/get-all`).then((response) => {
    return response.json();
  })
  .then((myJson) => {
    setData(myJson);
    setLoad(true);
    });
  },[]);
  function handleAdd() {
    history.push(
      {
        pathname:`/edit-card`,
        state: { deckName:'',newDeck:true,newCard:true }
      }
      );
  }
return (
  <div>
  {load?<div className={classes.root}>
        <div className={classes.year}>
        <InputLabel id="topic-select-label">Year</InputLabel>
        <Select
          labelId="topic-select-label"
          id="topic-select"
          value={yearKey}
          onChange={(event)=>{setYearKey(event.target.value);
            let deckKeys=Object.keys(data[event.target.value]);
          }}
        >
          {yearKeys.map(
                      (year, index) => (
                        <MenuItem key={index} value={year}>
                          {year}
                        </MenuItem>
                      )
                    )}
        </Select>
        </div>
            <Card>
            <CardContent className={classes.root_cardContent}>
                <Grid container spacing={1}>
                {
                  Object.keys(data).length !== 0?data.map((value,index)=>{
                    return(
                     <Grid item key={index} item xs={3}>
                    <FlashDeck flashdeck={value}/>
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