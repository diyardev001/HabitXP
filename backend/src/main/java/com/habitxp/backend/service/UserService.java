package com.habitxp.backend.service;

import com.habitxp.backend.dto.UserProfileResponse;
import com.habitxp.backend.model.Space;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.TaskRepository;
import com.habitxp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
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

    public void levelUp(String userId, String choice) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        switch (choice) {
            case "HEALTH" -> user.setMaxHealth(user.getMaxHealth() + 2);
            case "TASK_LIMIT" -> user.setTaskLimit(user.getTaskLimit() + 1);
            default -> throw new IllegalArgumentException("Ungültige Auswahl: " + choice);
        }

        user.setHealth(user.getMaxHealth()); // immer voll auffüllen nach Level-Up
        userRepository.save(user);
    }

    public UserProfileResponse getUserProfile(String userId) {
        User user = getUserById(userId);
        long currentTasks = taskRepository.countByUserId(userId);
        return new UserProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getLevel(),
                user.getHealth(),
                user.getMaxHealth(),
                user.getCurrentXP(),
                user.getXpGoal(),
                user.getXpFactor(),
                user.isXpBonusActive(),
                user.getXpFactorUntil() != null ? user.getXpFactorUntil().toString() : null,
                user.getCoins(),
                user.getStreak(),
                user.getTaskLimit(),
                currentTasks,
                user.getAvatars()
        );
    }
}
