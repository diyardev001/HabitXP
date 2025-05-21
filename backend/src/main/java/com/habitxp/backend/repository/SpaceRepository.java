package com.habitxp.backend.repository;

import com.habitxp.backend.model.Space;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceRepository extends MongoRepository<Space, String> {
}
