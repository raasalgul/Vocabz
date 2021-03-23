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
    left:'56.8em'
  },
    position: 'relative',
    top:'5em'
  },
  year: {
   display:'flex',
   marginRight:30,
   flexDirection:'column',
   alignItems:'flex-end'
  },
  root_cardContent:{
    backgroundImage:'linear-gradient(to bottom,#7F8086,#080808);',
    minHeight:'55em',
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
export default function FlashCards(props) {
  const history = useHistory();
    const serviceURLHost="ec2-3-129-248-199.us-east-2.compute.amazonaws.com:8089";
  const classes = useStyles();
  
const [data,setData]=useState({});
const [load,setLoad]=useState(true);
useEffect(()=>{
  fetch(`${serviceURLHost}/vocabz-home/decks/card/${props.location.state.deckName}`).then((response) => {
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
        state: { deckName: data.deck,newDeck:false,newCard:true }
      }
      );
  }
return (
  <div>
  {load?<div className={classes.root}>
            <Card className={classes.root_cardContent}>
            <Button variant='outlined' onClick={()=>{history.push(`/flash-decks`)}}>&#10060;</Button>
            <Typography variant="h5" component="h2" className={classes.topic_style}>
                       {data.deck}
                       </Typography>
            <CardContent>
                <Grid container spacing={1}>
                {
                  Object.keys(data).length !== 0?data.cards.map((value,index)=>{
                    return(
                     <Grid item key={index} item xs={3}>
                    <FlashCard flashcard={value} flashdeck={data.deck}/>
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