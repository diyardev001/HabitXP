package com.habitxp.backend.service;

import com.habitxp.backend.dto.CompletionResponse;
import com.habitxp.backend.dto.StatusResponse;
import com.habitxp.backend.model.Space;
import com.habitxp.backend.model.Task;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.SpaceRepository;
import com.habitxp.backend.repository.TaskRepository;
import com.habitxp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final SpaceRepository spaceRepository;
    private final SpaceService spaceService;

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final AIAgentService aiagent;

    public List<Task> getTasksByUser(String userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        tasks.forEach(task -> {
            task.updateCompletionStatus();
            taskRepository.save(task);
        });
        return tasks;
    }

    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    public Task createTask(Task task) {
        task.setRewardXP(aiagent.calculateXP(task));
        task.setRewardCoins(aiagent.calculateCoins(task));
        Optional<Space> spaceOpt = spaceService.getSpaceById(task.getSpaceId());
        Task savedTask = taskRepository.save(task);
        if (spaceOpt.isPresent()) {
            Space space = spaceOpt.get();
            space.addTask(savedTask.getId());

            spaceRepository.save(space);
        }
        return savedTask;
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
            applyRewardsToUser(user, task);
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

    private void applyRewardsToUser(User user, Task task) {
        user.addXP(task.getRewardXP());
        user.setCoins(user.getCoins() + task.getRewardCoins());
        user.xpFactorReset();
        userRepository.save(user);
    }
}
