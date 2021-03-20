package com.raasalgul.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.raasalgul.bean.CardStatus;
import com.raasalgul.bean.DeckCardsInfo;
import com.raasalgul.constants.ApplicationConstants;
import com.raasalgul.dto.DailyStats;
import com.raasalgul.dto.Status;
import com.raasalgul.exception.GenericException;
import com.raasalgul.repository.DailyStatsRepository;

@Service
public class CardService {
	@Autowired
	DailyStatsRepository dailyStatsRepository;
	public CardStatus cardStatusUpdate(CardStatus cardStatus) throws GenericException {
		try {
			List<DailyStats> dailyStats=dailyStatsRepository.findByDeck(cardStatus.getDeck());
			Optional<DailyStats> dailyStat=dailyStats.stream()
					.filter(card->card.getCard().equals(cardStatus.getCard()))
					.findFirst();
			List<Status> statuses=dailyStat.get().getStatus();
			Float level=statuses.get(statuses.size()-1).getLevel();
			if(cardStatus.getStatus().equalsIgnoreCase(ApplicationConstants.NEUTRAL))
			{
				level=(float) (level-level/5);
			}
			else if(cardStatus.getStatus().equalsIgnoreCase(ApplicationConstants.FAILURE))
			{
				level=(float) (level-level/10);
			}
			else if(level<90)
			{
				level=(float) (level+level/10);
			}
			else
			{
				level=(float) (level+level/5);
			}
			Status status=new Status(level,LocalDateTime.now());
			statuses.add(status);
			dailyStat.get().setStatus(statuses);
			dailyStat.get().setAddedLogon(LocalDateTime.now());
			dailyStatsRepository.save(dailyStat.get());
		}
		catch(Exception e)
		{
			throw new GenericException(e+"", e.getMessage());
		}
		return cardStatus;
	}

	public DailyStats cardDelete(DeckCardsInfo deck) throws GenericException {
		Optional<DailyStats> dailyStat;
		try {
			List<DailyStats> cards=dailyStatsRepository.findByDeck(deck.getDeck());
			dailyStat=cards.stream().filter(card->card.getCard().equals(deck.getCards().get(0).getCard()))
			.findAny();
			dailyStatsRepository.deleteById(dailyStat.get().get_id());
	}
	catch(Exception e)
	{
		throw new GenericException(e+"", e.getMessage());
	}
	return dailyStat.get();
	}

}
