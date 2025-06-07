package com.habitxp.backend.service;

import com.habitxp.backend.dto.CompletionResponse;
import com.habitxp.backend.dto.StatusResponse;
import com.habitxp.backend.model.Task;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final AIAgentService aiagent;

    public List<Task> getTasksByUser(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        task.setRewardXP(aiagent.calculateXP(task));
        task.setRewardCoins(aiagent.calculateCoins(task));
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public CompletionResponse completeTask(Task task, User user) {
        boolean success = task.markAsCompleted(user);
        taskRepository.save(task);

        return new CompletionResponse(
                success,
                task.isCompleted(),
                task.remainingCompletions()
        );
    }

    public StatusResponse getTaskStatus(Task task) {
        return new StatusResponse(
                task.isCompleted(),
                task.remainingCompletions(),
                task.getColor(),
                task.getColorCompleted()
        );
    }
}
