package com.habitxp.backend.repository;

import com.habitxp.backend.model.Task;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUserId(String userId);

    List<Task> findByUserIdAndCompleted(String userId, boolean completed);
}
