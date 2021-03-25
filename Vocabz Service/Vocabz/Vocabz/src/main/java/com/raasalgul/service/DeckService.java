package com.raasalgul.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
			System.out.println(deckInfos);
			deckInfos=deckInfos.stream().sorted((v1,v2)->Float.compare(v1.getStatus().get(v1.getStatus().size()-1).getLevel(),v2.getStatus().get(v2.getStatus().size()-1).getLevel())).collect(Collectors.toList());
			deckInfos=deckInfos.stream().sorted((v1,v2)->Integer.compare(v1.getStatus().size(),v2.getStatus().size())).collect(Collectors.toList());
			System.out.println(deckInfos);
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
