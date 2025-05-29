package com.habitxp.backend.repository;

import com.habitxp.backend.model.Bonus;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BonusRepository extends MongoRepository<Bonus, String> {
}
