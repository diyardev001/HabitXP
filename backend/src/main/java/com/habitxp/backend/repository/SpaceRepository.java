package com.habitxp.backend.repository;

import com.habitxp.backend.model.Space;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceRepository extends MongoRepository<Space, String> {
    List<Space> findByUserId(String userId);
}
