package com.habitxp.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String refreshToken;

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;

    private int maxHealth;
    private int health;
    private int coins;

    private int streak;
    private boolean streakBroken;

    @Builder.Default
    private int xpFactor = 1;
    private Instant xpFactorUntil;
    private boolean bonusActive;

    private int level;
    private int xp;
    private int currentXP;
    private int xpGoal;

    private List<String> spaceIds;
    private List<String> bonusIds;
    private List<String> avatars;

    public void addSpace(String spaceId) {
        this.spaceIds.add(spaceId);
    }

    public void removeSpace(String spaceId) {
        this.spaceIds.remove(spaceId);
    }

    public void calculateLevel() {
        int tempLevel = 0;
        double xpSum = 0;
        while (xp >= xpSum + Math.round(100 * Math.pow(1.2, tempLevel))) {
            xpSum += Math.round(100 * Math.pow(1.2, tempLevel));
            tempLevel++;
        }
        this.level = tempLevel;
    }

    public void calculateCurrentXP() {
        double xpSum = 0;
        for (int i = 0; i < level; i++) {
            xpSum += Math.round(100 * Math.pow(1.2, i));
        }
        this.currentXP = (int) (xp - xpSum);
    }

    public void calculateXPGoal() {
        this.xpGoal = (int) Math.round(100 * Math.pow(1.2, level));
    }

    public void xpFactorReset() {
        if (xpFactorUntil != null && Instant.now().isAfter(xpFactorUntil)) {
            xpFactor = 1;
            xpFactorUntil = null;
        }
    }
    

} 
