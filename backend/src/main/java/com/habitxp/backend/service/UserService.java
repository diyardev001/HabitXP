package com.habitxp.backend.service;

import com.habitxp.backend.model.Space;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserFromSpace(Space space) {
        return userRepository.findById(space.getUserId());
    }


    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public void addSpaceId(String userId, String spaceId) {
        userRepository.findById(userId).ifPresent(user -> {
            user.getSpaceIds().add(spaceId);
            userRepository.save(user);
        });
    }
}
