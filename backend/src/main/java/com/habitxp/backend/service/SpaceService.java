package com.habitxp.backend.service;

import com.habitxp.backend.model.Space;
import com.habitxp.backend.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceRepository spaceRepository;

    public List<Space> getSpacesByUser(String userId) {
        return spaceRepository.findByUserId(userId);
    }

    public Optional<Space> getSpaceById(String id) {
        return spaceRepository.findById(id);
    }

    public Space createSpace(Space space) {
        return spaceRepository.save(space);
    }

    public Space updateSpace(Space space) {
        return spaceRepository.save(space);
    }

    public void deleteSpace(String id) {
        spaceRepository.deleteById(id);
    }
}
