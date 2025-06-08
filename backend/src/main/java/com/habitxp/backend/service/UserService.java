package com.habitxp.backend.service;

import com.habitxp.backend.model.Bonus;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.BonusRepository;
import com.habitxp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BonusRepository bonusRepository;

    int i=0;

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
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

    public boolean redeemBonus(String userId, String bonusId) {
        User user = userRepository.findById(userId).orElse(null);
        Bonus bonus = bonusRepository.findById(bonusId).orElse(null);

        if (user == null || bonus == null) return false;
        if (!user.getInv().getBonusIds().contains(bonusId)) return false;

        // Bonus anwenden und aus Inventar entfernen
        bonus.applyTo(user);
        user.getInv().getBonusIds().remove(bonusId);

        userRepository.save(user);
        return true;
    }

    
    @Scheduled(cron = "0 0 0 * * *") // täglich um Mitternacht
    public void checkUsersForHpPenalty() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getHealth() <= 0) {
                if (user.getCoins() >= 50) {
                    user.setCoins(user.getCoins() - 50);
                    user.setHealth(5);
                    System.out.println("User " + user.getUsername() + " revived for coins.");
                }
                userRepository.save(user);
            }
        }
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
