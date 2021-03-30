import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEffect} from "react"
import { useHistory } from "react-router-dom";
import {serviceURLHost} from "../../constants/Constant"
import authHeader from '../services/auth-header';
// import axios from "axios";
const useStyles = makeStyles(theme => ({
    root: {
        display:'flex',
        minWidth: 275,
        position:"relative",
        top:"150px",
        flexWrap:"wrap",
        flexShrink:1,
        justifyContent:"center",
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 420,
      },
      '& .MuiFormControlLabel-root':{
        margin: theme.spacing(2.5),
      },
      '& .MuiButton-outlined':{
        position:'relative',
        left:'33.4em'
      }
    },
    card: {
        flexBasis:'1000px',
      },
      card_blur:{
        flexBasis:'1000px',
        backgroundColor: 'rgba(0,0,0,0.3)'
      },
      formControl: {
        margin: theme.spacing(1),
        flexBasis:'700px'
      },
      deck:{
        flexBasis:'700px'
      },
      checkboxs:{
        display:'flex',
        marginTop:'25px'
      },
      cardContent:{
        display:'flex',
        flexWrap:'wrap',
        flexShrink:1,
      },
      task_view:{
        flexBasis:'700px'
      },
      meaning:{
        flexBasis:'700px'
      },
      submitButton:{
        backgroundColor: "#41658A",
        color:"#ffffff",
        float:"left",
        margin:10,  
        '&:hover': {
         backgroundColor:'#414073',
         color: '#FFF'
      }
    }
  }));
export default function EditCard(props) {
  const history = useHistory();
    const [deck, setDeck] = React.useState(props.location.state.deckName);
    const [card, setCard] = React.useState('');
    const [meaning,setMeaning]=React.useState('');
    const [checkedDeck, setCheckedDeck] = React.useState(props.location.state.newDeck);
    const [checkedCard, setCheckedCard] = React.useState(props.location.state.newCard);
    // const [checkedActive,setCheckedActive]=React.useState(false);
    const [check,setCheck]=useState(false); 
    const [decks,setDecks]=React.useState([]);
    const [getDeckObject,setDeckObject]=React.useState({ "deck": "",
    "cards":[
      {
        "card":"",
        "meaning":""
      }
    ]
  });
    useEffect(()=>{
      // axios.get(`${serviceURLHost}/Elotz-home/dailyUpdate/deck`).then(res => {
        // const topics = res.data;
        // console.log(topics);
        // setDecks(topics);
      // });
      fetch(`${serviceURLHost}/vocabz-home/decks/get-all`,{ headers: authHeader() }).then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        let deckArr=[];
        myJson.map(value=>{
          deckArr.push(value.deckName);
        });
        setDecks(deckArr);
      });
      // if(deck!=='' && !checkedDeck)
      if(deck!=='' && !checkedDeck)
      fetch(`${serviceURLHost}/vocabz-home/decks/card/${deck}`,{ headers: authHeader() }).then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        setDeckObject(myJson);
       
      });
    },[deck,checkedDeck]);
  const classes = useStyles();
  function handleClose()
  {
    history.push(`/flash-decks`);
  }
  async function handleSubmit(){
    let data={};
    let cards=[];
    let updateCard={};
    data.deck=deck;
    updateCard.card=card;
    updateCard.meaning=meaning;
    cards.push(updateCard);
    data.cards=cards;
    console.log(data);
    const response = await fetch(`${serviceURLHost}/vocabz-home/update/add-edit`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: authHeader(),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  
  }
  return (
      <div className={classes.root}>
        {
        }
         {check? <div style={{position:"absolute",top:"50%",right:"50%"}}><CircularProgress color="secondary"/></div>:null}
    <Card className={classes.card}>
    <Button variant='outlined' onClick={handleClose}>&#10060;</Button>
      <CardContent className={classes.cardContent}>
          {checkedDeck?
        <TextField  value={deck} className={classes.deck} id="standard-basic" label="Deck"  onChange={(event)=>{setDeck(event.target.value)}}/>:
        <FormControl className={classes.formControl}>
      <InputLabel id="deck-select-label">Deck</InputLabel>
        <Select
          labelId="deck-select-label"
          id="deck-select"
          value={deck}
          onChange={(event)=>{setDeck(event.target.value);
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 1000);
            })
          }}
        >
{
decks.map(
                      (stateCodeOption, index) => (
                        <MenuItem key={index} value={stateCodeOption}>
                          {stateCodeOption}
                        </MenuItem>
                      )
                    )}
        </Select>
        </FormControl>}
        <FormControlLabel
        className={classes.checkboxs}
        control={
            <Checkbox
            checked={checkedDeck}
            onChange={()=>{setCheckedDeck(!checkedDeck);
            }}
            value="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="New Deck"
      />
        {checkedCard?
         <TextField value={card} className={classes.task_view} id="standard-basic" label="Card" onChange={(event)=>{setCard(event.target.value)}}/>:
        <FormControl className={classes.formControl}>
      <InputLabel id="card-select-label">Card</InputLabel>
        <Select
          labelId="card-select-label"
          id="card-select"
          value={card}
          onChange={(event)=>{setCard(event.target.value);
          //   const localTask=getDeckObject.tasks.indexOf(event.target.value);
          // //  const checked=getDeckObject.active.find((value,index)=>{ if(index===getDeckObject.tasks.indexOf(event.target.value))return value; });
          //   console.log(getDeckObject.active);
          //   setCheckedActive(false);
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              let cards=getDeckObject.cards;
              //  const checked=getDeckObject.active.find((value,index)=>{ if(index===getDeckObject.tasks.indexOf(event.target.value))return value; });
              let card=cards.find(card=>{
                if(event.target.value===card.card)
                return card;
              })
              console.log(JSON.stringify(getDeckObject.cards) +` `+JSON.stringify(card));
                setMeaning(card.meaning);
              }, 1000);
            })
          }}
        >
          {getDeckObject.cards.map(
                      (card, index) => (
                        <MenuItem key={index} value={card.card}>
                          {card.card}
                        </MenuItem>
                      )
                    )}
          {/* <MenuItem value={'Ten'}>Ten</MenuItem>
          <MenuItem value={'Twenty'}>Twenty</MenuItem>
          <MenuItem value={'Thirty'}>Thirty</MenuItem> */}
        </Select>
        </FormControl>}
        <FormControlLabel
        className={classes.checkboxs}
        control={
            <Checkbox
            checked={checkedCard}
            onChange={()=>{setCheckedCard(!checkedCard);
            }}
            value="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="New Card"
      />
      <TextField className={classes.meaning} value={meaning} id="standard-basic" label="Meaning" onChange={(event)=>{setMeaning(event.target.value)}}/>
      </CardContent>
      <CardActions>
        <Button className={classes.submitButton} disabled={check} size="small" variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </CardActions>
    </Card>
    </div>
  );
}
