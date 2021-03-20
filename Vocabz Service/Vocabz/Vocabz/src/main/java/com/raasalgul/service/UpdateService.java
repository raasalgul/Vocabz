package com.raasalgul.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.raasalgul.bean.Card;
import com.raasalgul.bean.DeckCardsInfo;
import com.raasalgul.dto.DailyStats;
import com.raasalgul.dto.Status;
import com.raasalgul.exception.GenericException;
import com.raasalgul.repository.DailyStatsRepository;

@Service
public class UpdateService {
	@Autowired
	DailyStatsRepository dailyStatsRepository;
	public DeckCardsInfo updateDeckCardInfo(DeckCardsInfo deckCardInfo) throws GenericException {
		try {
			List<DailyStats>cards=dailyStatsRepository.findByDeck(deckCardInfo.getDeck());
			if(cards.size()>0)
			{
				if(deckCardInfo.getCards().size()>0)
				{
					Card updateCard = deckCardInfo.getCards().get(0);
				Optional<DailyStats> cardInfo = cards.stream().filter(card->card.getCard()!=null).
						filter(card->card.getCard().
						equals(updateCard.getCard())).findAny();
				if(cardInfo.isPresent())
				{
					cardInfo.get().setMeaning(updateCard.getMeaning());
					cardInfo.get().setAddedLogon(LocalDateTime.now());
					dailyStatsRepository.save(cardInfo.get());
				}
				else
				{
					DailyStats card=new DailyStats();
					card.setDeck(cards.get(0).getDeck());
					card.setCard(updateCard.getCard());
					card.setMeaning(updateCard.getMeaning());
					card.setUserId("1");
					card.setAddedDate(LocalDate.now());
					card.setAddedLogon(LocalDateTime.now());
					Status status=new Status(100f,LocalDateTime.now());
					card.setStatus(Arrays.asList(status));
					dailyStatsRepository.save(card);
				}
				}
			}
			else
			{
				DailyStats dailyStat=new DailyStats();
				dailyStat.setAddedDate(LocalDate.now());
				dailyStat.setAddedLogon(LocalDateTime.now());
				dailyStat.setDeck(deckCardInfo.getDeck());
				dailyStat.setUserId("1");
				if(null!=deckCardInfo.getCards()&&deckCardInfo.getCards().size()>0)
				{
				dailyStat.setCard(deckCardInfo.getCards().get(0).getCard());
				dailyStat.setMeaning(deckCardInfo.getCards().get(0).getMeaning());
				Status status=new Status(100f,LocalDateTime.now());
				dailyStat.setStatus(Arrays.asList(status));
				}
				dailyStatsRepository.save(dailyStat);
			}
		}
		catch(Exception e)
		{
			throw new GenericException(e+"", e.getMessage());
		}
		return deckCardInfo;
	}

}
