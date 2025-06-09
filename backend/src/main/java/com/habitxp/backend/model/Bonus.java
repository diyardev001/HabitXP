package com.habitxp.backend.model;

import lombok.*;

import java.time.Duration;
import java.time.Instant;
import java.util.Random;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.habitxp.backend.model.User;


@Document(collection = "bonuses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bonus {
    @Id
    private String id;
    private String name;
    private String description;
    private int cost;
    private int reward;
    private BonusType type;
    private int duration;

    public boolean isAffordable(int userCoins) {
        return userCoins >= cost;
    }

    public int applyTo(User user) {
        switch (type) {
            case XP_BOOST -> {
                user.setXpFactor(reward);
                user.setXpFactorUntil(Instant.now().plus(Duration.ofHours(duration)));
                return reward;
            }
            case HEALTH -> {
                if(user.getHealth()<user.getMaxHealth()){
                    user.setHealth(user.getHealth()+reward);
                    if(user.getHealth()>user.getMaxHealth()){
                        user.setHealth(user.getMaxHealth());
                    }
                }
                return reward;
            }
            case StreakFreeze -> {
                user.setStreakFreezeActive(true);
                user.setStreakFreezeUntil(Instant.now().plus(Duration.ofHours(duration)));
                return 0;
            }

            default -> throw new UnsupportedOperationException("Unbekannter Bonustyp: " + type);
        }
    }
    
}