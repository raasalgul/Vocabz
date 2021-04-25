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
import {serviceURLHost} from "../../constants/Constant";
import authHeader from '../services/auth-header';
import axios from "axios";
const useStyles = makeStyles({
  MuiGridGridXs3:{
flexBasis:'15%'
  },
  root: {
    background:'#ccc',
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
    // backgroundImage:'linear-gradient(to bottom,#7F8086,#080808);',
    background:'#ccc',
    minHeight:550,
    // maxHeight: 500,
    overflowY:'scroll'
  },
  topic_style: {
    color: "#212121",
    fontSize: 32,
    fontFamily:"Andale Mono",
    padding:20
  },
  fab: {
    position:'relative',
    top:'40%'
  }
});
export default function FlashDecks() {
  const history = useHistory();
  const classes = useStyles();

const [yearKeys,setYearKeys]=useState(['2021']);
const [yearKey,setYearKey]=useState('2021');
const [data,setData]=useState({});
const [load,setLoad]=useState(false);
useEffect(()=>{
  // fetch(`${serviceURLHost}/vocabz-home/decks/get-all`,{ headers: authHeader() }).then((response) => {
  //   return response.json();
  // })
  console.log(authHeader());
  console.log(JSON.stringify(authHeader()));
  axios.get(`${serviceURLHost}/vocabz-home/decks/get-all`, { headers: authHeader() })
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
  {Object.keys(data).length>0?<div className={classes.root}>
  <Typography variant="h5" component="h2" className={classes.topic_style}>
                       {"Deck"}
                       </Typography>
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
                <Grid>
                {
                  Object.keys(data).length !== 0?data.data.map((value,index)=>{
                    return(
                     <Grid item key={index}>
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