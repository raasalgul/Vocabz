package com.raasalgul.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.raasalgul.bean.ERole;
import com.raasalgul.dto.Role;


public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}