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
import {serviceURLHost} from "../../constants/Constant"
import AutorenewIcon from '@material-ui/icons/Autorenew';
const useStyles = makeStyles({
  refresh:{
    color:"#202020",
    cursor: "pointer",
    margin: "auto",
    width:'3em',
    height:'3em'
  },
  spin: {
    // margin: "auto",
    animation: "$spin 0.5s infinite",
    color:"#202020",
    width:'3em',
    height:'3em'
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
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
    left:'42.0em'
  },
  '& .MuiSvgIcon-root':{
    
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
  const [spin, setSpin] = useState(0);
  const history = useHistory();
  const classes = useStyles();
  
const [data,setData]=useState({});
const [deck,setDeck]=useState("");
const [load,setLoad]=useState(true);
useEffect(()=>{
  fetch(`${serviceURLHost}/vocabz-home/decks/card/${props.location.state.deckName}`).then((response) => {
    return response.json();
  })
  .then((myJson) => {
    setData(myJson);
    setDeck(myJson.deck);
    setLoad(true);
    });
  },[]);
  const refreshCanvas = () => {
    setSpin(true);
    fetch(`${serviceURLHost}/vocabz-home/decks/card/${deck}`).then((response) => {
      return response.json();
    })
    .then((myJson) => {
      setData(myJson);
      setLoad(true);
      });
    setTimeout(() => {
      setSpin(false);
    }, 1000);
    console.log("Refreshed");
};
  function removeCard(card)
  {
    console.log(`card ${card}`);
    let cards=data.cards;
    console.log(`card ${JSON.stringify(cards)}`);
    cards = cards.filter(c => c.card !== card);

    
    // let i=0;
    // for (i = cards.length - 1; i >= 0; i--) {
    //   if (cards[i].card === card) {
    //     cards.splice(i, 1);
    //   }
    //  }

    console.log(`card ${JSON.stringify(cards)}`);
    let localData={... data};
    localData.cards=cards;
    console.log(`card ${JSON.stringify(localData)}`);
    setData(localData);
  }
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
  <AutorenewIcon
       className={spin ? classes.spin : classes.refresh}
       onClick={refreshCanvas}
       spin={spin}
    />
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
                    <FlashCard flashcard={value} flashdeck={data.deck} removeCard={removeCard}/>
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