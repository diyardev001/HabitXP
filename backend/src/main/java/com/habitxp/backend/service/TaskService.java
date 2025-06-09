package com.habitxp.backend.service;

import com.habitxp.backend.dto.CompletionResponse;
import com.habitxp.backend.dto.StatusResponse;
import com.habitxp.backend.model.Space;
import com.habitxp.backend.model.Task;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.SpaceRepository;
import com.habitxp.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final SpaceRepository spaceRepository;
    private final SpaceService spaceService;

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

    public CompletionResponse completeTask(Task task, User user) {
        boolean success = task.markAsCompleted(user);
        taskRepository.save(task);

        return new CompletionResponse(
                success,
                task.isCompleted(),
                task.remainingCompletions(),
                task.getColorCompleted()
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
