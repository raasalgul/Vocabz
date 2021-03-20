package com.raasalgul.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.raasalgul.dto.DailyStats;


public interface DailyStatsRepository extends MongoRepository<DailyStats,ObjectId>{
	List<DailyStats> findByDeck(String deck);
}
