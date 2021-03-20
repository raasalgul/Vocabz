package com.raasalgul.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.raasalgul.bean.Card;
import com.raasalgul.bean.Deck;
import com.raasalgul.bean.DeckCardsInfo;
import com.raasalgul.dto.DailyStats;
import com.raasalgul.exception.GenericException;
import com.raasalgul.repository.DailyStatsRepository;

@Service
public class DeckService {
	@Autowired
	DailyStatsRepository dailyStatsRepository;
	public Set<Deck> getAllDecks() throws GenericException {
		Set<Deck> desks=new HashSet<>();
		try {
			dailyStatsRepository.findAll().forEach(dailyStat->{
				Deck deck=new Deck(dailyStat.getDeck(),dailyStat.getAddedLogon());
				desks.add(deck);
			});
		}
		catch(Exception e)
		{
			throw new GenericException(e+"", e.getMessage());
		}
		return desks;
	}

	public DeckCardsInfo getCardsOfDeck(String deck) throws GenericException {
		DeckCardsInfo deckCardsInfo=new DeckCardsInfo();
		try {
			List<Card> cards=new ArrayList<>();
			List<DailyStats> deckInfos=dailyStatsRepository.findByDeck(deck);
			deckCardsInfo.setDeck(deckInfos.get(0).getDeck());
			deckInfos.forEach(deckInfo->{
				Card card=new Card(deckInfo.getCard(),deckInfo.getMeaning());
				cards.add(card);
			});
			deckCardsInfo.setCards(cards);
		}
		catch(Exception e)
		{
			throw new GenericException(e+"", e.getMessage());
		}
		return deckCardsInfo;
	}

	public String deckDelete(String deck) throws GenericException {
		try {
				dailyStatsRepository.findByDeck(deck).forEach(deckInfo->{
				dailyStatsRepository.deleteById(deckInfo.get_id());
			});
		}
		catch(Exception e)
		{
			throw new GenericException(e+"", e.getMessage());
		}
		return deck;
	}

}
