package com.raasalgul.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.raasalgul.dto.DailyStats;


public interface DailyStatsRepository extends MongoRepository<DailyStats,Integer>{

}
