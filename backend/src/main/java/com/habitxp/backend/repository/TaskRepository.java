package com.habitxp.backend.repository;

import com.habitxp.backend.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUserId(String userId);

    List<Task> findBySpaceId(String spaceId);

    List<Task> findByUserIdAndCompleted(String userId, boolean completed);

    long countByUserId(String userId);
}
