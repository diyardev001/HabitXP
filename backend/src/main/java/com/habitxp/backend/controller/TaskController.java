package com.habitxp.backend.controller;

import com.habitxp.backend.model.Task;
import com.habitxp.backend.repository.SpaceRepository;
import com.habitxp.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final SpaceRepository spaceRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication auth) {
        String userId = auth.getName();
        return ResponseEntity.ok(taskService.getTasksByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable String id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication auth) {
        task.setUserId(auth.getName());
        Task savedTask = taskService.createTask(task);

        spaceRepository.findById(task.getSpaceId()).ifPresent(space -> {
            space.addTask(savedTask.getId());
            spaceRepository.save(space);
        });

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @PutMapping
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }


}
