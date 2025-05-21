package com.habitxp.backend.repository;

import com.habitxp.backend.model.Space;
import com.habitxp.backend.model.Task;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SpaceRepository extends MongoRepository<Space, String> {
    List<Space> findByUserId(String userId);
}
