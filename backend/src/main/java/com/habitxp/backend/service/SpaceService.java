package com.habitxp.backend.service;

import com.habitxp.backend.dto.UpdateSpaceRequest;
import com.habitxp.backend.model.Space;
import com.habitxp.backend.model.Task;
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
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public List<Space> getSpacesByUser(String userId) {
        return spaceRepository.findByUserId(userId);
    }

    public Optional<Space> getSpaceById(String id) {
        return spaceRepository.findById(id);
    }

    public Space createSpace(Space space) {
        userRepository.findById(space.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return spaceRepository.save(space);
    }

    public Space updateSpaceColorKey(String id, UpdateSpaceRequest updatedSpace) {
        Space existing = getSpaceById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Space not found"));

        if (updatedSpace.getColorKey() != null) {
            existing.setColorKey(updatedSpace.getColorKey());
        }

        return spaceRepository.save(existing);
    }

    public void deleteSpace(String id) {
        Space space = spaceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Space not found"));

        List<Task> tasksToDelete = taskRepository.findBySpaceId(id);
        taskRepository.deleteAll(tasksToDelete);

        spaceRepository.delete(space);
    }
}
