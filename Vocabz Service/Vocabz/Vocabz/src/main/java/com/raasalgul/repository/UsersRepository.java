package com.raasalgul.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.raasalgul.dto.DailyStats;
import com.raasalgul.dto.Users;


public interface UsersRepository extends MongoRepository<Users,ObjectId>{

	Optional<Users> findByUserName(String userName);
	
	  Boolean existsByUserName(String userName);

	  Boolean existsByEmail(String email);
}
