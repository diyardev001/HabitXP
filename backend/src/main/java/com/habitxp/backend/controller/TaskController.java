package com.habitxp.backend.controller;

import com.habitxp.backend.dto.CompletionResponse;
import com.habitxp.backend.dto.StatusResponse;
import com.habitxp.backend.model.Task;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.SpaceRepository;
import com.habitxp.backend.repository.TaskRepository;
import com.habitxp.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskRepository taskRepository;
    private final SpaceRepository spaceRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication auth) {
        String userId = auth.getName();
        return ResponseEntity.ok(taskService.getTasksByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task, Authentication auth) {
        task.setUserId(auth.getName());
        Task savedTask = taskService.createTask(task);

        spaceRepository.findById(task.getSpaceId()).ifPresent(space -> {
            space.addTask(savedTask.getId());
            spaceRepository.save(space);
        });

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task updatedTask) {
        if (!id.equals(updatedTask.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mismatched task ID");
        }
        Task savedTask = taskService.updateTask(updatedTask);
        return ResponseEntity.ok(savedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    // --- Habit Tracking --- //

    @PostMapping("/{id}/complete")
    public ResponseEntity<CompletionResponse> completeTask(@PathVariable String id, Authentication auth) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        User user = User.builder().id(auth.getName()).build();
        CompletionResponse response = taskService.completeTask(task, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<StatusResponse> getTaskStatus(@PathVariable String id, Authentication auth) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        StatusResponse status = taskService.getTaskStatus(task);
        return ResponseEntity.ok(status);
    }
}
