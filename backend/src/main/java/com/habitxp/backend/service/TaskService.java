package com.habitxp.backend.service;

import com.habitxp.backend.dto.CompletionResponse;
import com.habitxp.backend.dto.StatusResponse;
import com.habitxp.backend.model.Task;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.TaskRepository;
import com.habitxp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final AIAgentService aiagent;

    public List<Task> getTasksByUser(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
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

    public CompletionResponse completeTask(String taskId, String userId) {
        Task task = getTaskById(taskId);
        User user = getUserById(userId);

        boolean success = task.markAsCompleted(user);
        taskRepository.save(task);

        if (success) {
            applyRewardsToUser(user, task.getRewardXP(), task.getRewardCoins());
        }

        return new CompletionResponse(
                success,
                task.isCompleted(),
                task.remainingCompletions(),
                task.getRewardXP(),
                task.getRewardCoins()
        );
    }

    public StatusResponse getTaskStatus(String taskId) {
        Task task = getTaskById(taskId);
        task.updateCompletionStatus();

        return new StatusResponse(
                task.isCompleted(),
                task.remainingCompletions(),
                task.getColorKey()
        );
    }

    private User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private void applyRewardsToUser(User user, int rewardXP, int rewardCoins) {
        final int rewardHealth = 10; // TODO: durch KI bestimmen?

        user.setXp(user.getXp() + rewardXP);
        user.setCoins(user.getCoins() + rewardCoins);

        int newHealth = user.getHealth() + rewardHealth;
        user.setHealth(Math.min(newHealth, user.getMaxHealth()));

        user.calculateLevel();
        user.calculateCurrentXP();
        user.calculateXPGoal();

        userRepository.save(user);
    }
}
