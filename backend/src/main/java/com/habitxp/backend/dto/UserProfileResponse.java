package com.habitxp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserProfileResponse {
    private String id;
    private String username;
    private int level;
    private int health;
    private int maxHealth;
    private int currentXP;
    private int xpGoal;
    private int xpFactor;
    private boolean xpBonusActive;
    private String xpFactorUntil;
    private int coins;
    private int streak;
    private int taskLimit;
    private long currentTasks;
    private List<String> avatars;
}
