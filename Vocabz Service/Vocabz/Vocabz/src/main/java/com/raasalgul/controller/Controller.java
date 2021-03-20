package com.raasalgul.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raasalgul.bean.Card;
import com.raasalgul.bean.CardStatus;
import com.raasalgul.bean.DeckCardsInfo;
import com.raasalgul.service.CardService;
import com.raasalgul.service.DeckService;
import com.raasalgul.service.UpdateService;

@CrossOrigin
@RestController
@RequestMapping("/vocabz-home")
public class Controller {
	@Autowired
	DeckService deckService;
	@Autowired
	CardService cardService;
	@Autowired
	UpdateService updateService;
	@RequestMapping("/decks/get-all")
	public List<String> getAllDecks()
	{
		return deckService.getAllDecks();
	}
	@GetMapping("/decks/card/{deck}")
	public DeckCardsInfo getDailyUpdateTasks(@PathVariable String deck)
	{
		return deckService.getCardsOfDeck(deck);
	}
	@PostMapping("/card/status-update")
	public CardStatus cardStatusUpdate(@RequestBody CardStatus cardStatus)
	{
		return cardService.cardStatusUpdate(cardStatus);
	}
	@DeleteMapping("/card/delete")
	public Card cardDelete(@RequestBody Card card)
	{
		return cardService.cardDelete(card);
	}
	@DeleteMapping("deck/delete")
	public String deckDelete(@RequestBody String deck)
	{
		return deckService.deckDelete(deck);
	}
	@PostMapping("update/add-edit")
	public DeckCardsInfo updateDeckCardInfo(@RequestBody DeckCardsInfo deckCardInfo)
	{
		return updateService.updateDeckCardInfo(deckCardInfo);
	}
}